import { UserDto } from "src/user/application/dto/user.dto";
/**
 * DTO de salida HTTP para el endpoint de registro de usuario.
 * Pertenece a la capa de presentación del slice auth.
 * Contiene los datos del usuario registrado y los tokens de acceso y refresco.
 */

//! Nota: Por que este se conecta directo al slice user desde el slice auth
//* Esto pasa por que el dto es considerado una estructura tonta, 
//* como no tiene implementación oculta ni dependencias técnicas, 
//* no hay nada que abstraer ni ocultar. Importar la clase UserDto directamente 
//* es completamente seguro y no acopla los módulos a nivel técnico

export class RegisterResponseDto {
    /** Datos del usuario registrados */
    user: UserDto;
    /** Access Token para acceder a recursos protegidos */
    accessToken: string;
    /** Refresh Token para mantener la sesión activa del usuario*/
    refreshToken: string;
    
}
