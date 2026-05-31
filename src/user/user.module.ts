import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/prisma.module';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserController } from './presentation/user.controller';
import { UserService } from './user.service';

/**
 * Módulo Nest del vertical slice users.
 * Registra controllers, use cases e implementación del repositorio.
 */
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    GetUserByIdUseCase,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
