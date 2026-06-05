import { User as PrismaUser } from '../../../generated/prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';

/**
 * Mapper de infraestructura: traduce entre modelos Prisma y entidad de dominio.
 */
export class UserMapper {
  /**
   * Convierte un registro Prisma en UserEntity de dominio.
   */
  static toDomain(prismaUser: PrismaUser): UserEntity {
    return UserEntity.fromPersistence(
      prismaUser.id,
      prismaUser.name,
      Email.fromPersistence(prismaUser.email),
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }

  /**
   * Convierte UserEntity en datos listos para persistir con Prisma.
   */
  static toPersistence(user: UserEntity) {
    return {
      id: user.id,
      name: user.getName(),
      email: user.getEmail().getValue(),
      password: user.getPasswordHash(),
    };
  }
}
