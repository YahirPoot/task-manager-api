import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './shared/filters/custom-exception.filter';

/** Punto de entrada: crea la app Nest, registra filtros globales y escucha peticiones. */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Registramos el filtro global estandarizado para toda la aplicación
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
