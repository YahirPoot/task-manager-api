import { Injectable } from '@nestjs/common';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { IHasher } from '../../application/contracts/hasher.interface';

/** Promisificamos `scrypt` para poder usarlo con async/await */
const scryptAsync = promisify(scrypt);

/**
 * Implementación del IHasher usando el módulo nativo `crypto` de Node.js.
 *
 * Usa el algoritmo `scrypt`, que es resistente a ataques de fuerza bruta
 * y funciona sin instalar dependencias externas.
 *
 * Formato del hash almacenado: `salt:hash` (separados por dos puntos).
 */
@Injectable()
export class NativeHasher implements IHasher {
  /**
   * Genera un hash seguro usando scrypt.
   * Crea un salt aleatorio de 16 bytes para cada contraseña.
   * Retorna el resultado como "salt:hash" en formato hexadecimal.
   */
  async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  /**
   * Compara una contraseña en texto plano contra el hash almacenado.
   * Usa `timingSafeEqual` para prevenir ataques de timing.
   *
   * @param password - Contraseña en texto plano enviada por el usuario.
   * @param storedHash - Hash en formato "salt:hash" guardado en la base de datos.
   */
  async compare(password: string, storedHash: string): Promise<boolean> {
    // Separar el salt del hash almacenado
    const [salt, hash] = storedHash.split(':');

    if (!salt || !hash) {
      return false;
    }

    // Derivar la clave con el mismo salt para compararla
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

    // Comparación en tiempo constante para evitar timing attacks
    return timingSafeEqual(Buffer.from(hash, 'hex'), derivedKey);
  }
}
