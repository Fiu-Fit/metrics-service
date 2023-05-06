import { Page } from '@fiu-fit/common';
import { Injectable } from '@nestjs/common';
import { ProgressMetric } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { GetMetricsQueryDTO } from './dto/get-metrics-query.dto';
import { ProgressMetricDTO } from './dto/progress-metric.dto';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  createProgressMetric(data: ProgressMetricDTO): Promise<ProgressMetric> {
    return this.prisma.progressMetric.create({
      data,
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
      },
    });

    return {
      rows:  rows,
      count: rows.length,
    };
  }

  getProgressMetricById(id: number): Promise<ProgressMetric | null> {
    return this.prisma.progressMetric.findUnique({
      where: {
        id: id,
      },
    });
  }

  editProgressMetric(
    id: number,
    data: ProgressMetricDTO
  ): Promise<ProgressMetric | null> {
    return this.prisma.progressMetric.update({
      where: {
        id: id,
      },
      data,
    });
  }

  deleteProgressMetric(id: number): Promise<ProgressMetric | null> {
    return this.prisma.progressMetric.delete({
      where: {
        id: id,
      },
    });
  }
}
