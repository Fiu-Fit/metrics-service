import { Controller, NotFoundException } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common/decorators';
import { GetMetricsQueryDTO, ProgressMetricDTO } from './dto';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metricService: MetricsService) {}

  @Post()
  createProgressMetric(@Body() body: ProgressMetricDTO) {
    return this.metricService.createProgressMetric(body);
  }

  @Get()
  getProgressMetrics(@Query() filter: GetMetricsQueryDTO) {
    if (Object.values(filter).some(value => !!value)) {
      return this.metricService.findAndCountWithFilter(filter);
    }

    return this.metricService.findAndCount();
  }

  @Get(':id')
  async getProgressMetricById(@Param('id') id: number) {
    const progressMetric = await this.metricService.getProgressMetricById(id);
    if (!progressMetric) {
      throw new NotFoundException({ message: 'Progress metric not found' });
    }

    return progressMetric;
  }

  @Put(':id')
  async updateProgressMetric(
    @Param('id') id: number,
    @Body() data: ProgressMetricDTO
  ) {
    const targetProgressMetric = await this.metricService.getProgressMetricById(
      id
    );
    if (!targetProgressMetric) {
      throw new NotFoundException({ message: 'Progress metric not found' });
    }
    return this.metricService.editProgressMetric(id, data);
  }

  @Delete(':id')
  deleteProgressMetric(@Param('id') id: number) {
    return this.metricService.deleteProgressMetric(id);
  }
}
