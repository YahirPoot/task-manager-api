import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/prisma.module';

// Controladores
import { UserController } from './presentation/user.controller';

// Contratos (tokens de inyección)
import { UserRepository } from './domain/repositories/user.repository';
import { IUserService } from './application/contracts/user-service.interface';

// Implementaciones de infraestructura
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';

// Casos de Uso
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';

// Servicio de aplicación (implementa IUserService)
import { UserService } from './application/services/user.service';

/**
 * Módulo del slice user.
 *
 * Registra todos los proveedores del slice y expone únicamente IUserService
 * para que otros slices (como auth) puedan consumir las capacidades de usuarios
 * sin acceder directamente a repositorios, entidades o casos de uso internos.
 */
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    // Casos de uso internos del slice
    GetUserByIdUseCase,
    RegisterUseCase,

    // Repositorio: se enlaza el contrato abstracto con la implementación Prisma
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },

    // Contrato público: se enlaza IUserService con el servicio de aplicación
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
  /**
   * Solo se exporta IUserService.
   * Otros slices no deben importar UserRepository ni casos de uso internos.
   */
  exports: [IUserService],
})
export class UserModule { }
