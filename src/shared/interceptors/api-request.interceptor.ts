import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        return value;
      }),
      catchError((err) => {
        // Throwing back the error which will get returned back to the client side
        const response = context.switchToHttp().getResponse<Response>();
        // Note: Adding raw error to res for debugging/logging purpose
        response.err = err;

        throw err;
      }),
    );
  }
}
