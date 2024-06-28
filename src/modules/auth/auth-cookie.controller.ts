import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AdminAuthService } from './auth.service';
import { AUTH_COOKIE_KEY } from 'src/keys';
import { AppConfigService } from '../../app-config/app-config.service';

@ApiTags('Admin Auth')
@Controller('q')
export class AdminAuthCookieController {
  constructor(
    private adminAuthService: AdminAuthService,
    private appConfigService: AppConfigService,
  ) {}

  @ApiExcludeEndpoint()
  @Get(':token')
  async validateCookieToken(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    await this.adminAuthService.validateCookieToken({ token });

    return res
      .status(200)
      .cookie(AUTH_COOKIE_KEY, token)
      .redirect(`${this.appConfigService.shAdminPanelUrl}?shAdmin=${token}`);
  }
}
