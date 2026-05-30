import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService,],
})
export class AppModule {}
