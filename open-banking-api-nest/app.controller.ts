import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('System')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('health')
    healthCheck() {
        return this.appService.getHealthCheck();
    }
}