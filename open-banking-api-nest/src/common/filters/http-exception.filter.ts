import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json(
            ApiResponse.error(
                exception.message,
                {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                },
            ),
        );
    }
}