import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkeModule } from './bookmark/bookmarke.module';
import { PrismaModule } from './prisma/prisma.module';
import AuthModule from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),AuthModule, UserModule, BookmarkeModule, PrismaModule],
})
export class AppModule {}
