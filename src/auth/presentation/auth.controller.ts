import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUseCase } from '../application/use-cases/register.use-case';
import { RegisterDto } from './dto/register.dto.';
import { RegisterResponseDto } from './dto/register-response.dto';

/**
 * Controlador HTTP del slice auth.
 *
 * Responsabilidad: recibir peticiones HTTP, extraer los datos del cuerpo
 * y delegarlos al caso de uso correspondiente.
 *
 * No contiene lógica de negocio — solo orquesta la entrada/salida HTTP.
 */
@Controller('auth')
export class AuthController {
  constructor(
    /** Caso de uso de registro — contiene la lógica de hasheo y delegación al slice user */
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  /**
   * POST /auth/register
   *
   * Registra un nuevo usuario en el sistema.
   * El caso de uso hashea la contraseña y delega la creación al slice user.
   *
   * @param body - Datos de registro: name, email, password (texto plano).
   * @returns    - Datos públicos del usuario creado (sin contraseña).
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto): Promise<RegisterResponseDto> {
    return this.registerUseCase.execute(body.name, body.email, body.password, body.role!);
  }
}
