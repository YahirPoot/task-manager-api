import { DomainError } from './domain.error';

/** Se lanza cuando la contraseña no cumple las reglas de complejidad del value object Password. */
export class InvalidPasswordError extends DomainError {
  constructor() {
    super('Password does not meet requirements', 'INVALID_PASSWORD');
  }
}
