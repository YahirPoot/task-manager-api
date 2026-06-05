/**
 * Contrato de respuesta HTTP para operaciones que devuelven un usuario.
 * No incluye password ni passwordHash.
 */
export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
