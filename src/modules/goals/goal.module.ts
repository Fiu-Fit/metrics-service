import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ProgressService } from '../metrics/progress.service';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  imports:     [HttpModule],
  exports:     [GoalService],
  controllers: [GoalController],
  providers:   [GoalService, ProgressService, PrismaService],
})
export class GoalModule {}
