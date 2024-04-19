import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../constants/role.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(requireRoles, 'requireRoles');

    if (!requireRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const hasRole = () => requireRoles === user.type;

    return hasRole() && user;
  }
}
