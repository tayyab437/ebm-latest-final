import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy {
  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid JWT payload tokens.');
    }
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
