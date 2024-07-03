import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE_TIENNT') private readonly authService: AuthService,
  ) {}

  //GET ALL ACCOUNTS WITHOUT AUTHORIZATION
  @Get('accounts')
  getAllAccountsTemp() {
    return this.authService.getAllAccounts();
  }

  @Get('email/:email')
  getAccountByEmail(@Param('email') email: string) {
    return this.authService.getAccountByEmail(email);
  }

  @Patch('/active_status/:id')
  updateActiveStatus(@Param('id') id: string) {
    return this.authService.updateActiveStatus(id);
  }

  @Post('create-account')
  async register(
    @Body()
    data: {
      email: string;
      password: string;
      username: string;
      phone: string;
    },
  ) {
    var result = await this.authService.register(data);
    return { message: 'success', metadata: result };
  }

  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
    @Res() res: any,
  ) {
    var result = await this.authService.login(data.email, data.password);
    res.cookie('token', result, { httpOnly: true, maxAge: 60 * 60 });
    res.send({ status: 'success', metadata: result });
  }

  // ! apis for admin

  @Get('admin/all-accounts')
  @UseGuards(AdminGuard)
  getAllAccounts() {
    return this.authService.getAllAccounts();
  }

  @Delete('admin/delete-account/:id')
  @UseGuards(AdminGuard)
  deleteAccount(@Param('id') id: string) {
    return this.authService.softDeleteAccount(id);
  }
  @Put('admin/undo-delete-account/:id')
  @UseGuards(AdminGuard)
  undoDeleteAccount(@Param('id') id: string) {
    return this.authService.undoDeleteAccount(id);
  }
}
