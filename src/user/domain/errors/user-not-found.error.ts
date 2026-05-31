import { DomainError } from './domain.error';

/** Se lanza cuando no existe un usuario con el identificador solicitado. */
export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`User with id "${userId}" was not found`, 'USER_NOT_FOUND');
  }
}
