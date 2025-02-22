import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'role.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(), 
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () => requireRoles.some((role) => user?.roles?.includes(role));
    const valid = user && user.roles && hasRole();
    if(!valid) throw new ForbiddenException('No tienes permiso para acceder a esta ruta')
    return valid;
  }
}
