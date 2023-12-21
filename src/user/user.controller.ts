import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { jwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {

    @UseGuards(jwtGuard)
    @Get('me')
    getme(@Req() req: Request) {
        return req.user
    }
}
