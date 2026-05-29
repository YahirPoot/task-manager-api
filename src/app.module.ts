import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
