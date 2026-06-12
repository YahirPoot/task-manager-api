import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';

/**
 * Módulo raíz de la aplicación.
 * Registra los slices principales: user y auth.
 */
@Module({
  imports: [
    // Carga el archivo de configuración .env en el objeto global process.env
    ConfigModule.forRoot({
      // Validamos que el uso de las variables de entorno sean de manera global
      isGlobal: true, 
      // Ruta del archivo .env
      envFilePath: '.env',
      // Esquema de validación
      validationSchema: validationSchema,
      // Opciones de validación
      validationOptions: {
        allowUnknown: true, // Permite variables de entorno no definidas
        abortEarly: true, // Detiene la validación al primer error encontrado
      }
    }),

    // TypeOrmModule.
    PrismaModule, 
    UserModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

