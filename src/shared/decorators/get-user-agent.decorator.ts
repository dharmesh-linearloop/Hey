import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserAgent = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.headers['user-agent'];
  },
);
