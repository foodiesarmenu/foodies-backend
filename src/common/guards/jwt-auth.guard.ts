import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['admin', 'vendor', 'mobile']) {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    console.log('request.headers.authorization-------------------------------------', request.headers.authorization);

    if (!request.headers.authorization) {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      console.log('isPublic-------------------------------------', isPublic);

      if (isPublic) {
        return true;
      }

    }


    return super.canActivate(context);
  }
}
