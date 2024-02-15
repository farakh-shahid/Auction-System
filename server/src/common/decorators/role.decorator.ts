import { ROLES_KEY } from '@/utils/stringConstants/string.constant'
import { SetMetadata } from '@nestjs/common'
import { UserRole } from '@prisma/client'

export const Role = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)
