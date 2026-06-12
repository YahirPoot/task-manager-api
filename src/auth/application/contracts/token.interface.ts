
/*
    * Puerto (constrato) para el servicio de gestión de tokens
    * 
    * Responsabilidades:
    * 1. Generar tokens de acceso y refresco
    * 2. Verificar tokens de acceso y refresco
    * 3. Obtener información del token
*/
export abstract class IToken {
    /**
     * Genera un token de acceso.
     * @param userId - Identificador único del usuario.
     * @param email - Correo electrónico del usuario.
     * @returns Token de acceso.
     */
    abstract generateAccessToken(userId: string, email: string): Promise<string>;

    /**
     * Genera un token de refresco.
     * @param userId - Identificador único del usuario.
     * @returns Token de refresco.
     */
    abstract generateRefreshToken(userId: string): Promise<string>;

    /**
     * Verifica el token de refresco.
     * @param refreshToken - Token de refresco a verificar.
     * @returns ID del usuario si el token es válido, null en caso contrario.
     */
    abstract verifyRefreshToken(refreshToken: string): Promise<string>;

    abstract verifyAccessToken(accessToken: string): Promise<string>;
}