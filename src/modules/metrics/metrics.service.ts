import { Page } from '@fiu-fit/common';
import { Injectable } from '@nestjs/common';
import { ProgressMetric } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { GetMetricsQueryDTO, ProgressMetricDTO } from './dto';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  burntCalories(
    // exerciseId: string,
    timeSpent: number
    // userId: number
  ): number {
    const METValue = 0; // Change this
    const bodyWeight = 0; // Change this
    return ((METValue * 3.5 * bodyWeight) / (200 * 60)) * timeSpent;
  }

  createProgressMetric(data: ProgressMetricDTO): Promise<ProgressMetric> {
    const burntCalories = this.burntCalories(
      // data.exerciseId,
      data.timeSpent
      // data.value,
    );

    return this.prisma.progressMetric.create({
      data: {
        ...data,
        burntCalories,
      },
    });
  }

  async findAndCount(): Promise<Page<ProgressMetric>> {
    return {
      rows: await this.prisma.progressMetric.findMany({
        orderBy: { id: 'asc' },
      }),
      count: await this.prisma.progressMetric.count(),
    };
  }

  async findAndCountWithFilter(
    filter: GetMetricsQueryDTO
  ): Promise<Page<ProgressMetric>> {
    const rows = await this.prisma.progressMetric.findMany({
      orderBy: { id: 'asc' },
      where:   {
        updatedAt: {
          gte: filter.start,
          lte: filter.end,
        },
        exerciseId: filter.exercise,
        userId:     filter.user,
      },
    });

    return {
      rows,
      count: rows.length,
    };
  }

  getProgressMetricById(id: number): Promise<ProgressMetric | null> {
    return this.prisma.progressMetric.findUnique({
      where: {
        id,
      },
    });
  }

  editProgressMetric(
    id: number,
    data: ProgressMetricDTO
  ): Promise<ProgressMetric | null> {
    return this.prisma.progressMetric.update({
      where: {
        id,
      },
      data,
    });
  }

  deleteProgressMetric(id: number): Promise<ProgressMetric | null> {
    return this.prisma.progressMetric.delete({
      where: {
        id,
      },
    });
  }
}
