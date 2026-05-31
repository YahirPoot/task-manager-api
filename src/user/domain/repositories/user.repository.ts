import { UserEntity } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';

/**
 * Puerto de persistencia del agregado User (capa de dominio).
 * Define qué operaciones necesita la aplicación sin acoplarse a Prisma.
 */
export abstract class UserRepository {
  /** Busca un usuario por su email. Retorna null si no existe. */
  abstract getUserByEmail(email: Email): Promise<UserEntity | null>;

  /** Busca un usuario por su identificador único. Retorna null si no existe. */
  abstract getUserById(userId: string): Promise<UserEntity | null>;

  /** Persiste un nuevo usuario y retorna la entidad creada. */
  abstract createUser(user: UserEntity): Promise<UserEntity>;
}
