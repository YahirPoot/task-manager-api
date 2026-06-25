import { Injectable } from '@nestjs/common';
import { CustomError } from '../../../shared/errors/custom.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserDto } from '../dto/user.dto';

/**
 * Caso de Uso: obtener un usuario por su identificador único.
 *
 * Orquesta el acceso al repositorio de dominio y mapea el resultado
 * a un DTO público de la capa de aplicación (sin datos sensibles).
 *
 * No conoce Prisma, HTTP ni ningún detalle de infraestructura.
 */
@Injectable()
export class GetUserByIdUseCase {
  constructor(
    /** Puerto de persistencia del dominio — la implementación real es Prisma */
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Busca un usuario por su UUID y lo retorna como UserDto.
   *
   * @param userId - UUID del usuario a buscar.
   * @throws {CustomError} Si el ID está vacío o no existe ningún usuario con ese ID.
   */
  async execute(userId: string): Promise<UserDto> {
    const id = userId?.trim();

    // Evitar consultas innecesarias a la base de datos con un ID vacío
    if (!id) {
      throw CustomError.notFound(`User with ID ${userId} not found.`);
    }

    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw CustomError.notFound(`User with ID ${id} not found.`);
    }

    // Mapear la entidad de dominio al DTO público (sin exponer el passwordHash)
    return {
      id: user.id,
      name: user.getName(),
      email: user.getEmail().getValue(),
      role: user.getRole(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

