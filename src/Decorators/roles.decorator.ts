import { SetMetadata } from "@nestjs/common";
import { Role } from "role.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles); //{roles: [Role.ADMIN Or Role.USER]}