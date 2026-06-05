import { Injectable } from '@nestjs/common';
import { Prisma, User } from '../generated/prisma/client';
import { PrismaService } from '../shared/prisma.service';

/**
 * Servicio legacy que accede directamente a Prisma.
 * Se mantiene temporalmente para endpoints aún no migrados a use cases.
 * @deprecated Migrar a use cases en application/.
 */
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  /** Busca un usuario por criterio único de Prisma. */
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /** Lista usuarios con paginación y filtros de Prisma. */
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /** Crea un usuario directamente en Prisma (sin validación de dominio). */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  /** Elimina un usuario por criterio único de Prisma. */
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }
}
