import { Email } from '../value-objects/email.vo';

/**
 * Entidad de dominio que representa un usuario de la aplicación.
 * Encapsula identidad, datos personales y credenciales (hash).
 * No depende de NestJS ni de Prisma.
 */
export class UserEntity {
  private constructor(
    readonly id: string,
    private name: string,
    private email: Email,
    /** Hash de la contraseña; nunca almacenar texto plano. */
    private passwordHash: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  /**
   * Reconstruye un usuario a partir de datos ya persistidos en base de datos.
   * Usado por la capa de infraestructura al leer registros con Prisma.
   */
  static fromPersistence(
    id: string,
    name: string,
    email: Email,
    passwordHash: string,
    createdAt: Date,
    updatedAt: Date,
  ): UserEntity {
    return new UserEntity(
      id,
      name,
      email,
      passwordHash,
      createdAt,
      updatedAt,
    );
  }

  /** Devuelve el nombre visible del usuario. */
  getName(): string {
    return this.name;
  }

  /** Devuelve el email encapsulado como value object. */
  getEmail(): Email {
    return this.email;
  }

  /** Devuelve el hash de la contraseña (uso interno; no exponer en APIs). */
  getPasswordHash(): string {
    return this.passwordHash;
  }
}
