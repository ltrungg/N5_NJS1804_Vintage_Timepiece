// staff.guard.ts
import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class StaffGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly AuthService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = (request?.headers?.authorization as string)?.split(' ')[1];
      var response = await this.AuthService.verifyStaffToken(accessToken)
      if (response) {
        return true;
      } else throw new UnauthorizedException();;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

}
