import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class authservice {
    constructor(private Prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
        ) { }
    async signup(dto: AuthDto) {

        const hash = await argon.hash(dto.password);
        try {
            const user = await this.Prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })
            return user;
        } catch (erorr) {
            if (erorr instanceof PrismaClientKnownRequestError) {
                if (erorr.code === 'P2002') {
                    throw new ForbiddenException("Credentials taken");
                }
            } throw erorr
        }

    }
    async signin(dto: AuthDto) {
        //find the user by email
        const user = await this.Prisma.user.findUnique({
                where: {
                email: dto.email,
                },
            });
        //if user does not exist throw exception
        if (!user) 
            throw new ForbiddenException(
            "Credentials incorrect?",
        );

        //complare password
        const pwMatches = await argon.verify(user.hash, dto.password);

        //if password incorrect thro execption
        if(!pwMatches)
            throw new ForbiddenException(
                "Credentials incorrect?",
        );

        //send back the user
        return this.signToken(user.id, user.email);
    }

    async signToken (
        userId: number,
        email: string,
    ) {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get("JWT_SECRET"),
        })
        return {
            acces_token: token
        }
    }
}