/**
 * DTO de entrada HTTP para el endpoint de registro de usuario.
 * Pertenece a la capa de presentación del slice auth.
 * Contiene la contraseña en texto plano — el caso de uso la hashea antes de pasarla al dominio.
 */
export class RegisterDto {
  /** Nombre completo del usuario */
  name: string;
  /** Correo electrónico del usuario */
  email: string;
  /**
   * Contraseña en texto plano.
   * Se hashea en la capa de aplicación (RegisterUseCase) antes de pasarla al slice user.
   */
  password: string;

  /** Rol del usuario */
  role?: string;
}
