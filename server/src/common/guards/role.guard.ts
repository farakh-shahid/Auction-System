import { Reflector } from '@nestjs/core'
import { UserRole } from '@prisma/client'
import { ERROR_MESSAGES, HTTP_METHOD, ROLES_KEY } from '@/utils/stringConstants/string.constant'
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getClass())
    if (!roles) {
      return true
    }

    const { user, method } = context.switchToHttp().getRequest()
    if (method === HTTP_METHOD.GET) {
      return true
    }
    if (!this.isUserAuthorized(user, roles)) {
      throw new UnauthorizedException(ERROR_MESSAGES.PERMISSION_DENIED)
    }

    return true
  }

  private isUserAuthorized(user: { role: string | any[] }, requiredRoles: UserRole[]): boolean {
    return user && user.role && requiredRoles.some(role => user.role.includes(role))
  }
}
