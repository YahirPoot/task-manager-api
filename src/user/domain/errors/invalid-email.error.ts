import { DomainError } from './domain.error';

/** Se lanza cuando el formato del email no cumple las reglas del value object Email. */
export class InvalidEmailError extends DomainError {
  constructor() {
    super('Email is invalid', 'INVALID_EMAIL');
  }
}
