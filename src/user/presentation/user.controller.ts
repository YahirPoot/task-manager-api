import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IUserService } from '../application/contracts/user-service.interface';
import { RegisterUserDto, UserDto } from '../application/dto/user.dto';

/**
 * Controlador HTTP del slice user.
 *
 * Expone los endpoints de gestión de usuarios.
 * Se comunica con la capa de aplicación únicamente a través de IUserService.
 *
 * Los errores son capturados globalmente por CustomExceptionFilter.
 */
@Controller('users')
export class UserController {
  constructor(
    /** Contrato público del slice — no se inyecta la implementación concreta */
    private readonly userService: IUserService,
  ) {}

  /**
   * GET /users/:id
   * Retorna los datos públicos de un usuario por su ID.
   */
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  /**
   * POST /users/register
   *
   * Registra un nuevo usuario.
   * Este endpoint existe para uso directo del slice user.
   * El flujo principal de registro pasa por POST /auth/register.
   */
  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<UserDto> {
    return this.userService.register(body);
  }
}
