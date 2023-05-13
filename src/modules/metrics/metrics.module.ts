import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  imports:     [HttpModule],
  controllers: [MetricsController],
  providers:   [MetricsService, PrismaService],
})
export class MetricsModule {}
