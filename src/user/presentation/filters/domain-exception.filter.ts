import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '../../domain/errors/domain.error';
import { InvalidEmailError } from '../../domain/errors/invalid-email.error';
import { InvalidPasswordError } from '../../domain/errors/invalid-password.error';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

/**
 * Filtro global que traduce errores de dominio a respuestas HTTP.
 * Mantiene el domain libre de dependencias de NestJS.
 */
@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  /**
   * Captura DomainError y responde con status, code y message en JSON.
   */
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.resolveStatus(exception);

    response.status(status).json({
      statusCode: status,
      code: exception.code,
      message: exception.message,
    });
  }

  /**
   * Asigna el código HTTP según el tipo concreto de error de dominio.
   */
  private resolveStatus(exception: DomainError): number {
    if (exception instanceof UserNotFoundError) {
      return HttpStatus.NOT_FOUND;
    }
    if (
      exception instanceof InvalidEmailError ||
      exception instanceof InvalidPasswordError
    ) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.BAD_REQUEST;
  }
}
