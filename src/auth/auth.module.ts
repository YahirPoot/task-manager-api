import { Module } from '@nestjs/common';

// Módulos externos que este slice necesita
import { UserModule } from '../user/user.module';

// Controladores
import { AuthController } from './presentation/auth.controller';

// Casos de Uso
import { RegisterUseCase } from './application/use-cases/register.use-case';

// Contratos (tokens de inyección)
import { IHasher } from './application/contracts/hasher.interface';

// Implementaciones de infraestructura
import { NativeHasher } from './infrastructure/services/native-hasher.service';

/**
 * Módulo del slice auth.
 *
 * Responsabilidad: autenticación y registro de usuarios.
 *
 * Comunicación con el slice user:
 * - Importa UserModule para obtener acceso a IUserService.
 * - NUNCA importa UserRepository, UserEntity ni casos de uso internos del slice user.
 */
@Module({
  imports: [
    // Importamos UserModule para acceder a IUserService (el único canal inter-slice)
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    // Caso de uso de registro — orquesta hasheo + creación de usuario
    RegisterUseCase,

    // Hasher: se enlaza el contrato IHasher con la implementación nativa de Node.js
    {
      provide: IHasher,
      useClass: NativeHasher,
    },
  ],
})
export class AuthModule {}
