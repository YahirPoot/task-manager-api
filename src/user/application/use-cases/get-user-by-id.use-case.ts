import { Injectable } from '@nestjs/common';
import { UserResponseMapper } from '../mappers/user-response.mapper';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserResponseDto } from '../../presentation/dto/user-response.dto';

/**
 * Caso de uso: obtener un usuario por su identificador.
 * Orquesta dominio y repositorio; no conoce Prisma ni detalles HTTP.
 */
@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Busca un usuario por id y lo devuelve como DTO de respuesta (sin password).
   * @param userId - UUID del usuario.
   * @throws {UserNotFoundError} Si el id está vacío o el usuario no existe.
   */
  async execute(userId: string): Promise<UserResponseDto> {
    const id = userId?.trim();
    if (!id) {
      throw new UserNotFoundError(userId);
    }

    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }

    return UserResponseMapper.toResponse(user);
  }
}
