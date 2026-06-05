/**
 * Puerto (contrato) para el servicio de hasheo de contraseñas.
 *
 * Permite que la capa de aplicación utilice el hasheo sin conocer
 * la implementación concreta (bcrypt, scrypt, argon2, etc.).
 * La implementación real vive en la capa de infraestructura.
 */
export abstract class IHasher {
  /**
   * Genera un hash seguro a partir de una contraseña en texto plano.
   * @param password - Contraseña en texto plano a hashear.
   */
  abstract hash(password: string): Promise<string>;

  /**
   * Compara una contraseña en texto plano contra un hash almacenado.
   * @param password - Contraseña en texto plano a verificar.
   * @param hash     - Hash almacenado con el que comparar.
   */
  abstract compare(password: string, hash: string): Promise<boolean>;
}
