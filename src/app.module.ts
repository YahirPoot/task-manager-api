import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

/**
 * Módulo raíz de la aplicación.
 * Registra los slices principales: user y auth.
 */
@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

