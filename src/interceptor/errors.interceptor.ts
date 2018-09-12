import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalErrorsInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ) {
        return call$.pipe(catchError(err =>
                throwError(new HttpException(typeof err === 'object' ?
                    {
                        statusCode: err.code || err.statusCode || err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                        error: err.error || err.name || 'Internal server error',
                        message: err.message, 
                    } : err,
                    HttpStatus.INTERNAL_SERVER_ERROR
                ))
            )
        );
    }
}