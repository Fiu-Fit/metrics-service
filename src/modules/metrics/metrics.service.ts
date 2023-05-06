import { Page } from '@fiu-fit/common';
import { Injectable } from '@nestjs/common';
import { ProgressMetric } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { DateFilterDTO } from './dto/date-filter.dto';
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

  async findAndCountByDate(
    dateFilter: DateFilterDTO
  ): Promise<Page<ProgressMetric>> {
    const rows = await this.prisma.progressMetric.findMany({
      orderBy: { updatedAt: 'asc' },
      where:   {
        updatedAt: {
          gte: dateFilter.start,
          lte: dateFilter.end,
        },
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
