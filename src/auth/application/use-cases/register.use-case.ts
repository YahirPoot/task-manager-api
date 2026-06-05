import { Injectable } from '@nestjs/common';
import { IHasher } from '../contracts/hasher.interface';
import { IUserService } from 'src/user/application/contracts/user-service.interface';
import { UserDto } from 'src/user/application/dto/user.dto';

/**
 * Caso de Uso: Registro de un nuevo usuario desde el punto de entrada de autenticación.
 *
 * Responsabilidades:
 * 1. Hashear la contraseña usando el contrato IHasher (sin saber qué algoritmo usa internamente).
 * 2. Delegar la creación del usuario al slice de `user` a través de IUserService.
 *
 * IMPORTANTE: Este caso de uso NO conoce el repositorio de usuarios, ni la entidad UserEntity.
 * Solo se comunica con el slice `user` a través del contrato IUserService.
 */
@Injectable()
export class RegisterUseCase {
  constructor(
    /** Contrato para hasheo de contraseñas — implementado en infraestructura */
    private readonly hasher: IHasher,
    /** Contrato público del slice user — el único canal de comunicación entre slices */
    private readonly userService: IUserService,
  ) {}

  /**
   * Ejecuta el registro de un usuario:
   * - Hashea la contraseña de manera segura.
   * - Delega la persistencia al slice de usuarios.
   * - Retorna los datos públicos del usuario registrado (sin contraseña).
   *
   * @param name     - Nombre completo del usuario.
   * @param email    - Correo electrónico del usuario.
   * @param password - Contraseña en texto plano (se hashea antes de persistir).
   */
  async execute(name: string, email: string, password: string): Promise<UserDto> {
    // Hashear la contraseña — el texto plano nunca llega al slice user
    const passwordHash = await this.hasher.hash(password);

    // Delegar el registro al slice user vía el contrato IUserService
    return this.userService.register({ name, email, passwordHash });
  }
}
