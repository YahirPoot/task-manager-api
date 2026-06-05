import { RegisterUserDto, UserDto, UserAuthDto } from '../dto/user.dto';

/**
 * Contrato (Puerto de Aplicación) expuesto por el slice de usuarios.
 *
 * Permite a otros slices independientes (como auth) interactuar con la lógica
 * de usuarios de manera totalmente desacoplada.
 *
 * Regla de Vertical Slice:
 * - Otros slices SOLO pueden usar este contrato.
 * - NUNCA deben importar UserRepository, UserEntity ni casos de uso internos.
 */
export abstract class IUserService {
  /**
   * Obtiene los datos públicos de un usuario por su UUID.
   * @param id - Identificador del usuario.
   */
  abstract getUserById(id: string): Promise<UserDto>;

  /**
   * Obtiene los datos de un usuario por email, incluyendo el passwordHash.
   * Exclusivo para flujos de autenticación — no usar en respuestas HTTP.
   * @param email - Correo electrónico del usuario.
   */
  abstract getUserByEmailForAuth(email: string): Promise<UserAuthDto | null>;

  /**
   * Registra un nuevo usuario con la contraseña ya hasheada.
   * @param dto - Datos del usuario: name, email y passwordHash.
   */
  abstract register(dto: RegisterUserDto): Promise<UserDto>;
}
