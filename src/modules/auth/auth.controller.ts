import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AdminLoginDto,
  ResendAdminLoginOtpDto,
  VerifyAdminLoginOtpDto,
} from './dto/admin-login.dto';
import { AdminLoginJwtGuard } from './guards/admin-login-jwt.guard';
import { AdminAuthService } from './auth.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { AdminCookieTokenGuard } from './guards/admin-cookie-token.guard';

@ApiTags('Admin Auth')
@UseGuards(AdminCookieTokenGuard)
@Controller('auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login')
  async login(
    @Request() request: Request,
    @Body() adminLoginDto: AdminLoginDto,
  ) {
    const { captchaToken = '' } = adminLoginDto;
    await this.adminAuthService.validateCaptcha({ captchaToken });

    const validatedAdmin = await this.adminAuthService.validateAdmin({
      adminLoginDto,
    });

    if (!validatedAdmin?.user) {
      throw new UnauthorizedException();
    }

    if (validatedAdmin?.sendOtp) {
      return this.adminAuthService.sendLoginOtp({
        user: validatedAdmin?.user,
      });
    }

    return this.adminAuthService.login({ user: validatedAdmin?.user, request });
  }

  @Post('login/resend-otp')
  async resendLoginOtp(
    @Body()
    resendAdminLoginOtpDto: ResendAdminLoginOtpDto,
  ) {
    return this.adminAuthService.resendLoginOtp({
      resendAdminLoginOtpDto,
    });
  }

  @Post('login/verify-otp')
  async verifyLoginOtp(
    @Request() request: Request,
    @Body() verifyAdminLoginOtpDto: VerifyAdminLoginOtpDto,
  ) {
    const user = await this.adminAuthService.verifyLoginOtp({
      verifyAdminLoginOtpDto,
    });

    return this.adminAuthService.login({ user, request });
  }

  @ApiBearerAuth()
  @UseGuards(AdminLoginJwtGuard)
  @Get('who-am-i')
  whoAmI(@GetAdminSession() sessionData: AdminSessionType): AdminSessionType {
    return sessionData;
  }

  @ApiBearerAuth()
  @UseGuards(AdminLoginJwtGuard)
  @Post('logout')
  async logout(@GetAdminSession() sessionData: AdminSessionType) {
    return this.adminAuthService.logout({ sessionData });
  }
}
