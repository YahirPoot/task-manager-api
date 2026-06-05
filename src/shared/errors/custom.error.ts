/**
 * Clase genérica para errores de aplicación y dominio.
 * Encapsula el código de estado HTTP para que un solo filtro pueda manejar
 * todas las excepciones de forma estandarizada.
 */
export class CustomError extends Error {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  /** Error 400: El cliente envió datos inválidos o faltantes. */
  static badRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  /** Error 401: El cliente no está autenticado. */
  static unAuthorized(message: string): CustomError {
    return new CustomError(401, message);
  }

  /** Error 403: El cliente está autenticado pero no tiene permisos. */
  static forbidden(message: string): CustomError {
    return new CustomError(403, message);
  }

  /** Error 404: El recurso solicitado no existe. */
  static notFound(message: string): CustomError {
    return new CustomError(404, message);
  }

  /** Error 500: Error interno del servidor. */
  static internalServer(message: string): CustomError {
    return new CustomError(500, message);
  }
}
