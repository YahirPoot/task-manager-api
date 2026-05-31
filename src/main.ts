import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './user/presentation/filters/domain-exception.filter';

/** Punto de entrada: crea la app Nest, registra filtros globales y escucha peticiones. */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new DomainExceptionFilter());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
