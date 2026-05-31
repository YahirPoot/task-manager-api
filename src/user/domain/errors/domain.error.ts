/**
 * Clase base para errores de dominio.
 * No depende de HTTP ni de NestJS; la capa presentation los traduce a status codes.
 */
export abstract class DomainError extends Error {
  constructor(
    message: string,
    /** Código estable para identificar el error en respuestas API. */
    public readonly code: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
