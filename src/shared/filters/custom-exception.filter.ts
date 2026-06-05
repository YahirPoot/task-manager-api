import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { CustomError } from '../errors/custom.error';

/**
 * Filtro global que captura cualquier instancia de CustomError
 * y la mapea automáticamente a una respuesta HTTP estandarizada
 * utilizando el statusCode que el propio error define.
 */
@Catch(CustomError)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      message: exception.message,
    });
  }
}
