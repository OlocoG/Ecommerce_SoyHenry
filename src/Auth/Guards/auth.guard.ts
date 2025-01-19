import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { validate } from "../../Utils/validate_auth.util";
import { JwtService } from "@nestjs/jwt";
import { Role } from "role.enum";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]; //Authorization: Bearer sdasdasdafasfasfasdfasdfasf
        if (!token) {
            throw new UnauthorizedException('Not Authorized');
        }
        try {
            const secret = process.env.JWT_SECRET;
            const user = this.jwtService.verify(token, {secret}); //{id,email,rol}
            
            user.exp = new Date(user.exp * 1000);
            user.iat = new Date(user.iat * 1000);
            
            request.user = {
                id: user.user_id,
                email: user.email,
                roles: user.roles,
            };
            return true;
        } catch (error) {
            throw new UnauthorizedException('Not Authorized');
        }
    }

}