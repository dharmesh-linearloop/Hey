import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AdminSessionType } from '../types/admin-session.type';

export const GetAdminSession = createParamDecorator(
  (data: any, ctx: ExecutionContext): AdminSessionType => {
    if (data) {
      console.log('data', data);
    }
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
