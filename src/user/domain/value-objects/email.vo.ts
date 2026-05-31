import { InvalidEmailError } from '../errors/invalid-email.error';

/**
 * Value object que representa un email válido y normalizado.
 * Garantiza formato correcto al registrarse o actualizar datos.
 */
export class Email {
  private constructor(private readonly value: string) {}

  /**
   * Crea un email validando formato y normalizando (trim + minúsculas).
   * @throws {InvalidEmailError} Si el formato no es válido.
   */
  static create(raw: string): Email {
    const normalized = raw.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new InvalidEmailError();
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
