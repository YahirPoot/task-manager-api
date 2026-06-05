import { Injectable } from '@nestjs/common';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.use-case';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Email } from '../../domain/value-objects/email.vo';
import { IUserService } from '../contracts/user-service.interface';
import { RegisterUseCase } from '../use-cases/register.use-case';
import { RegisterUserDto, UserAuthDto, UserDto } from '../dto/user.dto';

/**
 * Servicio de Aplicación del slice user.
 *
 * Implementa el contrato público IUserService, que es el único canal
 * a través del cual otros slices (como auth) pueden interactuar con usuarios.
 *
 * Delega cada operación al caso de uso correspondiente en lugar de contener lógica directa.
 */
@Injectable()
export class UserService implements IUserService {
  constructor(
    /** Caso de uso para obtener un usuario por su ID */
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    /** Caso de uso para registrar un nuevo usuario */
    private readonly registerUseCase: RegisterUseCase,
    /** Repositorio de dominio — solo se usa aquí para getUserByEmailForAuth */
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Obtiene los datos públicos de un usuario por su ID.
   * Delega en GetUserByIdUseCase.
   */
  async getUserById(id: string): Promise<UserDto> {
    // GetUserByIdUseCase retorna el mismo shape que UserDto
    return this.getUserByIdUseCase.execute(id);
  }

  /**
   * Obtiene la información interna de un usuario por email para autenticación.
   * Incluye el passwordHash — solo debe usarse en flujos de autenticación.
   *
   * NOTA: Accedemos directamente al repositorio porque GetUserByIdUseCase no expone el hash.
   */
  async getUserByEmailForAuth(email: string): Promise<UserAuthDto | null> {
    const emailVo = Email.create(email);
    const user = await this.userRepository.getUserByEmail(emailVo);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.getName(),
      email: user.getEmail().getValue(),
      passwordHash: user.getPasswordHash(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Registra un nuevo usuario.
   * Delega en RegisterUseCase.
   */
  async register(dto: RegisterUserDto): Promise<UserDto> {
    return this.registerUseCase.execute(dto);
  }
}
