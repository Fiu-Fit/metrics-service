import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  imports:     [],
  controllers: [MetricsController],
  providers:   [MetricsService, PrismaService],
})
export class MetricsModule {}
