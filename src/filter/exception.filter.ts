import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any = {}, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const error = exception.error || exception.response || exception.message || exception;
        const statusCode = error.statusCode || error.code || error.status || HttpStatus.INTERNAL_SERVER_ERROR;

        console.log('exception', exception, error);

        response
            .status(statusCode)
            .json({
                statusCode,
                message: error.message,
                error: error.error || error.name || exception.name || 'Internal server error',
            });
    }
}