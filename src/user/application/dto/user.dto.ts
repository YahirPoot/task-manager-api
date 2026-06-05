/**
 * DTO utilizado para transferir los datos necesarios en la creación/registro de un usuario.
 * Contiene el hash de la contraseña procesada previamente en la capa de aplicación.
 */
export class RegisterUserDto {
  /** Nombre completo del usuario */
  name: string;
  /** Correo electrónico único del usuario */
  email: string;
  /** Hash de la contraseña generada con scrypt nativo — nunca texto plano */
  passwordHash: string;
}

/**
 * DTO que representa la respuesta pública y segura de un usuario.
 * Excluye cualquier dato sensible como contraseñas o hashes.
 */
export class UserDto {
  /** Identificador único (UUID) */
  id: string;
  /** Nombre completo del usuario */
  name: string;
  /** Correo electrónico del usuario */
  email: string;
  /** Fecha de creación del registro */
  createdAt: Date;
  /** Fecha de la última actualización del registro */
  updatedAt: Date;
}

/**
 * DTO especializado para procesos internos de autenticación.
 * Incluye el passwordHash necesario para verificar credenciales.
 * Solo debe usarse dentro del flujo de autenticación — no exponer en respuestas HTTP.
 */
export class UserAuthDto {
  /** Identificador único (UUID) */
  id: string;
  /** Nombre completo del usuario */
  name: string;
  /** Correo electrónico del usuario */
  email: string;
  /** Hash de la contraseña del usuario */
  passwordHash: string;
  /** Fecha de creación */
  createdAt: Date;
  /** Fecha de actualización */
  updatedAt: Date;
}
