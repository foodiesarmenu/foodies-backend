import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants/role.constant';

export const Roles = (role: Role) => SetMetadata('role', role);
