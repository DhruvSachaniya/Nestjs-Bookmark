import { Module } from "@nestjs/common";
import { authcontroller } from "./auth.controller";
import { authservice } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtStrategy } from "./stretegy";

@Module({
    imports: [JwtModule.register({})],
    controllers: [authcontroller],
    providers: [authservice, jwtStrategy]
})

export default class AuthModule {}