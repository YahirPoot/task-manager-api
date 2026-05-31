import { InvalidPasswordError } from '../errors/invalid-password.error';

/**
 * Value object para contraseña en texto plano durante registro o cambio.
 * Valida complejidad; el hash se genera fuera del dominio (infra/application).
 */
export class Password {
  private constructor(private readonly value: string) {}

  /**
   * Crea una contraseña validando reglas de complejidad.
   * Requiere mayúscula, minúscula y número o carácter especial.
   * @throws {InvalidPasswordError} Si no cumple los requisitos.
   */
  static create(raw: string): Password {
    const normalized = raw.trim();
    if (
      !/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
        normalized,
      )
    ) {
      throw new InvalidPasswordError();
    }
    return new Password(normalized);
  }

  /** Retorna el valor en texto plano para ser hasheado por la capa de infraestructura. */
  getValue(): string {
    return this.value;
  }
}
