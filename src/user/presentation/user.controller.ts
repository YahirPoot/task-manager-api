import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserModel } from '../../generated/prisma/models';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id.use-case';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from '../user.service';

/**
 * Capa presentation del slice users: expone endpoints HTTP.
 * Delega lógica a use cases (clean) o temporalmente a UserService (legacy).
 */
@Controller('user')
export class UserController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly userService: UserService,
  ) {}

  /**
   * Obtiene un usuario por id usando arquitectura vertical slice + clean.
   * GET /user/user/:id
   */
  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.getUserByIdUseCase.execute(id);
  }

  /**
   * Lista todos los usuarios (pendiente de migrar a use case).
   * GET /user/get-users
   */
  @Get('get-users')
  async getUsers(): Promise<UserModel[] | null> {
    return this.userService.users({});
  }

  /**
   * Registra un usuario (pendiente de migrar a use case).
   * POST /user/create-user
   */
  @Post('create-user')
  async registerUser(
    @Body()
    userData: {
      name: string;
      email: string;
      password: string;
    },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  /**
   * Elimina un usuario por id (pendiente de migrar a use case).
   * DELETE /user/delete
   */
  @Delete('delete')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}
