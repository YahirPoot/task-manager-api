import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Email } from '../../domain/value-objects/email.vo';
import { UserMapper } from '../mappers/user.mapper';

/**
 * Implementación del puerto UserRepository usando Prisma (capa de infraestructura).
 */
@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /** {@inheritdoc UserRepository.getUserById} */
  async getUserById(userId: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  /** {@inheritdoc UserRepository.getUserByEmail} */
  async getUserByEmail(email: Email): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email.getValue() },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  /** {@inheritdoc UserRepository.createUser} */
  async createUser(user: UserEntity): Promise<UserEntity> {
    const created = await this.prismaService.user.create({
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toDomain(created);
  }
}
