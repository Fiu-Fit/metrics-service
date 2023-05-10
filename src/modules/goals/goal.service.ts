import { Injectable } from '@nestjs/common';
import { Goal, GoalStatus } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { GetMetricsQueryDTO } from '../metrics/dto';
import { MetricsService } from '../metrics/metrics.service';
import { GetGoalsQueryDto } from './dto/get-goals-query.dto';
import { GoalDTO } from './dto/goal.dto';

@Injectable()
export class GoalService {
  constructor(
    private prismaService: PrismaService,
    private metricsService: MetricsService
  ) {}

  async createGoal(goal: GoalDTO): Promise<Goal> {
    const createdGoal = await this.prismaService.goal.create({ data: goal });
    return createdGoal;
  }

  async getGoalById(id: number): Promise<Goal | null> {
    const goal = await this.prismaService.goal.findUnique({
      where: { id },
    });

    if (!goal) {
      return null;
    }
      
    return this.checkGoalStatus(goal);
  }

  async findAll(): Promise<Goal[]> {
    const updatedGoals = await this.prismaService.goal.findMany({  
      orderBy:  { id: 'asc' },
    }).then(goals => Promise.all(goals.map(goal => this.checkGoalStatus(goal))));

    return updatedGoals;
  }

  async findAllWithFilter(filter: GetGoalsQueryDto): Promise<Goal[]> {
    const updatedGoals = await this.prismaService.goal.findMany({
      orderBy: { id: 'asc' },
      where:   { userId: filter.user }
    }).then(goals => Promise.all(goals.map(goal => this.checkGoalStatus(goal))));

    return updatedGoals;
  }

  editGoal(id: number, goal: GoalDTO): Promise<Goal> {    
    return this.prismaService.goal.update({
      where: { id },
      data:  goal,
    });
  }

  deleteGoal(id: number): Promise<Goal> {
    const goal = this.prismaService.goal.delete({
      where: {
        id,
      },
    });
    return goal;
  }

  /**
 * Checks if the Goal is completed or not. If it is not, it will check the value of all metrics
 * related to the Goal and compare it with the target goal value.
 * The Goal status will be updated if the target value is reached.
 * @param goal the goal to check its status.
 * @returns an updated Goal or the same passed as input if it did not update.
 */
  async checkGoalStatus(goal: Goal): Promise<Goal> {
    if (goal.status === GoalStatus.Completed || goal.status === GoalStatus.CompletedLate) { 
      return goal; 
    }

    const filter = new GetMetricsQueryDTO();
    filter.exercise = goal.exerciseId.toString();
    filter.start = new Date(goal.createdAt).toISOString();

    const metrics = await this.metricsService.findAndCountWithFilter(filter);

    // check the value of all metrics returned and compare it with the expected goal value
    let value = 0;
    metrics.rows.forEach(metric => {
      value += metric.value;
    });

    if (value >= goal.targetValue) {
      const status = (goal.deadline && goal.deadline >= new Date()) ? GoalStatus.Completed : GoalStatus.CompletedLate;
      return this.updateGoalStatus(goal, status);
    }
    return goal;
  }

  /**
   * Updates the status of a Goal.
   * @param goal the goal to update its status.
   * @param status the new status of the Goal.
   * @returns the updated Goal.
  */
  updateGoalStatus(goal: Goal, status: GoalStatus): Promise<Goal> {
    const updatedGoalDto = new GoalDTO;
    Object.assign(updatedGoalDto, { ...goal, status });

    return this.editGoal(
      goal.id, 
      updatedGoalDto
    );        
  }

}
