import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { MetricsService } from '../metrics/metrics.service';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  exports:     [GoalService],
  controllers: [GoalController],
  providers:   [GoalService, MetricsService, PrismaService],
})
export class GoalModule {}
