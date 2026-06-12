import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './shared/filters/custom-exception.filter';
import { ConfigService } from '@nestjs/config';

/** Punto de entrada: crea la app Nest, registra filtros globales y escucha peticiones. */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
  // Registramos el filtro global estandarizado para toda la aplicación
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Environment: ${nodeEnv}`);
    console.log(`Server is running in ${nodeEnv} mode`);
  });
}
bootstrap();
