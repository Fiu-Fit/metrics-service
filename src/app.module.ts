import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoalModule } from './modules/goals/goal.module';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports:     [ConfigModule.forRoot(), MetricsModule, GoalModule],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {}
