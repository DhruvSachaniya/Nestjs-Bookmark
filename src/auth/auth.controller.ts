import { Body, Controller, ParseIntPipe, Post, Req } from "@nestjs/common";
import { authservice } from "./auth.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class authcontroller {
    constructor(private authservice: authservice, 
        private jwt: JwtService) {
    }
    @Post("signup")
    signup(@Body() dto: AuthDto) {
        console.log({
            dto,
        });
        return this.authservice.signup(dto);
    }
    @Post("signin")
    signin(@Body() dto: AuthDto) {
        return this.authservice.signin(dto);
    }
}