import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE_TIENNT') private readonly AuthService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = (request?.headers?.authorization as string)?.split(' ')[1];
      var response = await this.AuthService.verifyAdminToken(accessToken)
      if (response) {
        return true;
      } else {
        throw new UnauthorizedException(); // Throw UnauthorizedException if access is denied
      }
    } catch (error) {
      throw new UnauthorizedException(); // Throw UnauthorizedException for any errors
    }
  }
}
