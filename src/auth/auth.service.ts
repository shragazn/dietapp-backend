import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 10);
    const userExists = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.create({ ...createUserDto, password });
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signIn(authDto: AuthDto) {
    const user = await this.usersService.findOneByEmail(authDto.email);
    if (!user) {
      throw new NotFoundException();
    }
    const match = await bcrypt.compare(authDto.password, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = await this.jwtService.sign(payload);
    const refresh_token = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, username: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username },
        {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.sign(
        { sub: userId, username },
        {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return { access_token, refresh_token };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    const match = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!match) {
      throw new UnauthorizedException();
    }
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signOut(userId: string) {
    await this.usersService.update(userId, { refreshToken: null });
  }
}
