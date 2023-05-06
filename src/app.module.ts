import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports:     [ConfigModule.forRoot(), MetricsModule],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {}
