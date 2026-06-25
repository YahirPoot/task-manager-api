import { UserEntity } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../../presentation/dto/user-response.dto';

/**
 * Mapper de capa application: convierte entidad de dominio en DTO de salida HTTP.
 * Excluye datos sensibles como el hash de la contraseña.
 */
export class UserResponseMapper {
  /**
   * Mapea UserEntity a UserResponseDto para exponer en la API.
   */
  static toResponse(user: UserEntity): UserResponseDto {
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
