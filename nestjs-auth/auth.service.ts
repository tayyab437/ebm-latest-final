import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  // Simulated service logic for integration blueprint
  async login(email: string, password: any) {
    if (!email || !password) {
      throw new BadRequestException('Email and password must be supplied.');
    }
    // Hashing/Argon2 verification occurs here in production
    return {
      success: true,
      token: 'ebm-mock-jwt-token-production',
      user: {
        id: 'usr-1',
        email,
        name: 'Imran Khan',
        role: 'STUDENT'
      }
    };
  }

  async register(payload: any) {
    // Save to Cloud SQL via Prisma in production
    const hashedPassword = await argon2.hash(payload.password);
    return {
      success: true,
      user: {
        id: 'usr-new',
        email: payload.email,
        name: payload.name,
        role: payload.role,
        ebmYear: payload.ebmYear
      }
    };
  }

  async verifyOtp(userId: string, code: string) {
    if (code === '123456') {
      return { success: true, token: 'mfa-verified-jwt-token' };
    }
    throw new UnauthorizedException('Invalid OTP code.');
  }
}
