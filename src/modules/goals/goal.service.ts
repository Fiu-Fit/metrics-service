import { Injectable } from '@nestjs/common';
import { Goal, GoalStatus } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { GoalDTO } from './goal.dto';

@Injectable()
export class GoalService {
  constructor(private prismaService: PrismaService) {}

  async createGoal(goal: GoalDTO): Promise<Goal> {
    const createdGoal = await this.prismaService.goal.create({ data: goal });
    return createdGoal;
  }

  getGoalById(id: number): Promise<Goal | null> {
    return this.prismaService.goal.findUnique({
      where: { id },
    });
  }

  findAll(user?: number): Promise<Goal[]> {
    return this.prismaService.goal.findMany({ 
      where:    { userId: user }, 
      orderBy:  { id: 'asc' },
    });
  }

  editGoal(id: number, goal: GoalDTO): Promise<Goal> {
    if (goal.actualValue >= goal.targetValue) {
      if (goal.deadline && goal.deadline < new Date()) {
        goal.status = GoalStatus.Completed;
      } else {
        goal.status = GoalStatus.CompletedLate;
      }
    }
    
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
}
