import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = {
  userName: string;
  password: string;
};

type SignData = {
  userId: string;
  userName: string;
};

type AuthResult = {
  accessToken: string;
  userId: string;
  userName: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignData | null> {
    const user = await this.usersService.findUserByName(input.userName);

    if (user && user.password === input.password) {
      return {
        userId: user.id,
        userName: user.name,
      };
    }
    return null;
  }

  async signIn(user: SignData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      userName: user.userName,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      userName: user.userName,
      userId: user.userId,
    };
  }
}
