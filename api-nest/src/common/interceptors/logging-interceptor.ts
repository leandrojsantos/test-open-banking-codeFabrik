import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, originalUrl, ip } = request;
        const userAgent = request.get('user-agent') || '';

        const now = Date.now();
        this.logger.log(
            `Incoming Request: ${method} ${originalUrl} - ${userAgent} ${ip}`,
        );

        return next.handle().pipe(
            tap({
                next: () => {
                    const response = context.switchToHttp().getResponse();
                    const { statusCode } = response;
                    const contentLength = response.get('content-length') || 0;

                    this.logger.log(
                        `Outgoing Response: ${method} ${originalUrl} ${statusCode} ${contentLength}bytes - ${Date.now() - now}ms`,
                    );
                },
                error: (error) => {
                    this.logger.error(
                        `Request Error: ${method} ${originalUrl} - ${error.message}`,
                        error.stack,
                    );
                },
            }),
        );
    }
}