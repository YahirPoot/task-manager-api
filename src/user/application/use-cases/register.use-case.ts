import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CustomError } from '../../../shared/errors/custom.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity, Role } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { RegisterUserDto, UserDto } from '../dto/user.dto';

/**
 * Caso de Uso: Registro de Usuario en el dominio.
 *
 * Responsabilidades:
 * - Validar que el correo no esté registrado.
 * - Crear la entidad de dominio UserEntity usando su fábrica estática.
 * - Persistir el usuario a través del repositorio de dominio.
 * - Retornar los datos públicos del usuario creado.
 */
@Injectable()
export class RegisterUseCase {
  constructor(
    /** Puerto de persistencia — la implementación concreta es PrismaUserRepository */
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Ejecuta el registro de un usuario.
   *
   * @param dto - Datos necesarios para registrar al usuario (con passwordHash).
   * @throws CustomError - Si el correo electrónico ya se encuentra registrado o faltan datos.
   */
  async execute(dto: RegisterUserDto): Promise<UserDto> {
    // Validar que los campos requeridos estén presentes antes de invocar el dominio
    if (!dto.name?.trim()) {
      throw CustomError.badRequest('Name is required.');
    }
    if (!dto.email?.trim()) {
      throw CustomError.badRequest('Email is required.');
    }
    if (!dto.passwordHash) {
      throw CustomError.badRequest('Password hash is required.');
    }

    const emailVo = Email.create(dto.email);

    // Verificar unicidad del email antes de intentar crear el usuario
    const existingUser = await this.userRepository.getUserByEmail(emailVo);
    if (existingUser) {
      throw CustomError.badRequest(`Email "${dto.email}" is already registered.`);
    }

    // Generar un identificador único de forma nativa (sin dependencias externas)
    const userId = randomUUID();

    // Mapear el rol del DTO (string) al Enum de Dominio (Role).
    // Si no viene, se asigna Role.USER por defecto.
    let userRole: Role = Role.USER;
    if (dto.role === 'SUPER_ADMIN') {
      userRole = Role.SUPER_ADMIN;
    } else if (dto.role === 'ADMIN') {
      userRole = Role.ADMIN;
    }

    // Crear la entidad de dominio — la fábrica valida las invariantes de negocio
    let userEntity: UserEntity;
    try {
      userEntity = UserEntity.create(
        userId,
        dto.name,
        emailVo,
        dto.passwordHash,
        userRole,
      );
    } catch (error: any) {
      // Atrapamos el error de la entidad y lo mapeamos a CustomError
      throw CustomError.badRequest(error.message);
    }

    // Persistir a través del repositorio (contrato del dominio)
    const savedUser = await this.userRepository.createUser(userEntity);

    // Retornar solo los datos públicos — nunca el passwordHash
    return {
      id: savedUser.id,
      name: savedUser.getName(),
      email: savedUser.getEmail().getValue(),
      role: savedUser.getRole(),
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }
}
