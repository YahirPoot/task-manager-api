import { CustomError } from '../../../shared/errors/custom.error';

/**
 * Value object que representa un email válido y normalizado.
 * Garantiza formato correcto al registrarse o actualizar datos.
 */
export class Email {
  private constructor(private readonly value: string) {}

  /**
   * Crea un email validando formato y normalizando (trim + minúsculas).
   * @throws {CustomError} Si el valor es vacío, nulo o tiene formato inválido.
   */
  static create(raw: string): Email {
    // Guardia temprana: evita crash con TypeError si raw es undefined o null
    if (!raw) {
      throw CustomError.badRequest('Email is required.');
    }

    const normalized = raw.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw CustomError.badRequest('Email format is invalid.');
    }
    return new Email(normalized);
  }

  /**
   * Rehidrata un email ya persistido en BD sin revalidar reglas de registro.
   * Usado al mapear filas de Prisma hacia la entidad de dominio.
   */
  static fromPersistence(value: string): Email {
    return new Email(value.trim().toLowerCase());
  }

  /** Retorna el valor primitivo del email para persistencia o respuestas HTTP. */
  getValue(): string {
    return this.value;
  }
}
