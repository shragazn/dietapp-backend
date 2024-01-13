import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.signUp(createUserDto);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      path: '/auth/refresh_token',
    });
    return { access_token: tokens.access_token };
  }

  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(createUserDto);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      path: '/auth/refresh_token',
    });
    return { access_token: tokens.access_token };
  }

  @Post('signout')
  async signout(@Req() req: Request, @Res() res: Response) {
    const userId = req.user['sub'];
    await this.authService.signOut(userId);

    res.clearCookie('refresh_token', { path: '/auth/refresh_token' });
    return { message: 'success' };
  }

  @Post('refresh_token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const userId = req.user['sub'];
    const refreshToken = req.cookies['refresh_token'];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      path: '/auth/refresh_token',
    });
    return { access_token: tokens.access_token };
  }
}
