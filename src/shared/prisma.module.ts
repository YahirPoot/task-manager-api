import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global de infraestructura compartida para acceso a base de datos.
 * Exporta PrismaService a todos los módulos sin reimportar en cada slice.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
