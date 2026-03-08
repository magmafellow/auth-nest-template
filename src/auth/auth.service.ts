import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (user.data.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.data.id, username: user.data.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
