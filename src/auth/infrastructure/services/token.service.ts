import { Injectable } from "@nestjs/common";
import { IToken } from "src/auth/application/contracts/token.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService implements IToken {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    async generateAccessToken(userId: string, email: string): Promise<string> {

        const payload = { sub: userId, email};
        return this.jwtService.signAsync(
            payload,
            {

                expiresIn: "20m",
            }
        );
    }

    async generateRefreshToken(userId: string): Promise<string> {
        const payload = { sub: userId };
        return this.jwtService.signAsync(
            payload,
            {
                expiresIn: "7d",
            }
        )
    }

    async verifyRefreshToken(refreshToken: string): Promise<string> {
        const payload = await this.jwtService.verifyAsync(refreshToken);
        return payload.userId as string;
    }

    async verifyAccessToken(accessToken: string): Promise<string> {
        const payload = this.jwtService.verify(accessToken);
        return payload;
    }


}