import { CustomError } from '../../../shared/errors/custom.error';

/**
 * Value object que representa una contraseña en texto plano válida.
 * Solo se usa durante el registro o cambio de credenciales para validar
 * las políticas de seguridad (longitud, complejidad, etc.) antes de hashear.
 */
export class Password {
  private constructor(private readonly value: string) {}

  /**
   * Valida la contraseña según las políticas de seguridad.
   * Regla de negocio: mínimo 6 caracteres.
   * @throws {CustomError} Si no cumple los requisitos.
   */
  static create(raw: string): Password {
    if (!raw || raw.length < 6) {
      throw CustomError.badRequest('Password must be at least 6 characters long.');
    }
    return new Password(raw);
  }

  /** Retorna la contraseña en texto plano para que el hasher la procese. */
  getValue(): string {
    return this.value;
  }
}
