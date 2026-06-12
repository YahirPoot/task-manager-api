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
import { IToken } from './application/contracts/token.interface';
import { TokenService } from './infrastructure/services/token.service';
import { JwtModule } from '@nestjs/jwt';

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
    // Importamos JwtModule para que provea JwtService al TokenService
    JwtModule.register({
      global: false, // Solo disponible en este módulo (buenas prácticas de aislamiento)
      secret: process.env.JWT_SECRET || 'super-secret', // idealmente usar env variables
    }),
  ],
  controllers: [AuthController],
  // Los servicios se registran aquí (ejemplo de providers: Pueden ser instances, classes o factories)
  // En este caso son classes que implementan interfaces (como IHasher y IToken) 
  // Tambien se pueden registrar casos de uso que nos sirven para inyectarlos a traves de las interfaces
  providers: [
    // Caso de uso de registro — orquesta hasheo + creación de usuario
    RegisterUseCase,

    // Hasher: se enlaza el contrato IHasher con la implementación nativa de Node.js
    {
      provide: IHasher,
      useClass: NativeHasher,
    },
    {
      provide: IToken, 
      useClass: TokenService
    }
  ],
})
export class AuthModule {}
