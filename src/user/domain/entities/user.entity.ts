import { Email } from '../value-objects/email.vo';

/**
 * Enumeración de los roles que puede tener un usuario.
 */
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN', 
  ADMIN = 'ADMIN', 
  USER = 'USER'
}

/**
 * Entidad de dominio que representa un usuario de la aplicación.
 *  
 * Reglas de negocio que protege:
 * - El nombre debe tener al menos 2 caracteres.
 * - El email debe ser válido y se encapsula como Value Object.
 * - La contraseña nunca se almacena en texto plano; solo el hash.
 *
 * No depende de NestJS ni de Prisma — es puro TypeScript.
 */
export class UserEntity {
  /**
   * Constructor privado: obliga a usar los métodos de fábrica estáticos.
   * Esto garantiza que cualquier instancia cumple las invariantes del dominio.
   */
  private constructor(
    readonly id: string,
    private name: string,
    private email: Email,
    /** Hash de la contraseña generado en la capa de infraestructura/aplicación. */
    private passwordHash: string,
    private role: Role,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  /**
   * Fábrica para crear un NUEVO usuario, aplicando reglas de negocio.
   * Lanza un error si el nombre es inválido o si falta el hash de contraseña.
   *
   * @param id          - UUID generado antes de llamar a esta fábrica.
   * @param name        - Nombre completo del usuario (mínimo 2 caracteres).
   * @param email       - Value Object Email ya validado.
   * @param passwordHash - Hash de la contraseña generado fuera del dominio.
   */
  static create(
    id: string,
    name: string,
    email: Email,
    passwordHash: string,
    role: Role, // Por defecto, el usuario será un usuario normal.
  ): UserEntity {
    const trimmedName = name?.trim();

    // Invariante: el nombre es obligatorio y no puede ser demasiado corto.
    if (!trimmedName || trimmedName.length < 2) {
      throw new Error('Name must be at least 2 characters long.');
    }

    // Invariante: el hash de contraseña es obligatorio para poder autenticar al usuario.
    if (!passwordHash) {
      throw new Error('Password hash is required.');
    }

    const now = new Date();
    return new UserEntity(id, trimmedName, email, passwordHash, role, now, now);
  }

  /**
   * Fábrica para RECONSTRUIR un usuario a partir de datos ya persistidos en base de datos.
   * No valida las reglas de negocio porque los datos ya fueron validados al crearse.
   * Usado por el mapper de infraestructura.
   */
  static fromPersistence(
    id: string,
    name: string,
    email: Email,
    passwordHash: string,
    role: Role,
    createdAt: Date,
    updatedAt: Date,
  ): UserEntity {
    return new UserEntity(id, name, email, passwordHash, role, createdAt, updatedAt);
  }

  /** Devuelve el nombre visible del usuario. */
  getName(): string {
    return this.name;
  }

  /** Devuelve el email encapsulado como Value Object. */
  getEmail(): Email {
    return this.email;
  }

  /** Devuelve el hash de la contraseña — solo para uso interno de autenticación. */
  getPasswordHash(): string {
    return this.passwordHash;
  }

  /** Devuelve el rol del usuario. */
  getRole(): Role {
    return this.role;
  }

}