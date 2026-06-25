import { Injectable } from '@nestjs/common';
import { IHasher } from '../contracts/hasher.interface';
import { IUserService } from 'src/user/application/contracts/user-service.interface';
import { IToken } from '../contracts/token.interface';
import { CustomError } from 'src/shared/errors/custom.error';
import { RegisterResponseDto } from 'src/auth/presentation/dto/register-response.dto';

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
    /** Contrato para generar los tokens - implementado en infraestructura */
    private readonly tokenService: IToken,
  ) {}

  /**
   * Ejecuta el registro de un usuario:
   * - Hashea la contraseña de manera segura.
   * - Genera el token de acceso y el token de refresco solo si se creo el usuario.
   * - Delega la persistencia al slice de usuarios.
   * - Retorna los datos públicos del usuario registrado (sin contraseña).
   *
   * @param name     - Nombre completo del usuario.
   * @param email    - Correo electrónico del usuario.
   * @param password - Contraseña en texto plano (se hashea antes de persistir).
   */
  async execute(name: string, email: string, password: string, role: string): Promise<RegisterResponseDto> {
    // Hashear la contraseña — el texto plano nunca llega al slice user
    const passwordHash = await this.hasher.hash(password);

    // Generar el token de acceso y el token de refresco solo si se creo el usuario
    // Delegar el registro al slice user vía el contrato IUserService
    const user = await this.userService.register({ name, email, passwordHash, role });

    if (!user) {
      throw CustomError.badRequest('There was an error and the user could not be created')
    }

    const accessToken = await this.tokenService.generateAccessToken(user.id, user.email, user.role);
    const refreshToken = await this.tokenService.generateRefreshToken(user.id, user.role);
    

    return {
      user,
      accessToken,
      refreshToken
    } 
  }
}
