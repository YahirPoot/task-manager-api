import { Email } from "../value-objects/email.vo";

/*
    * Entidad para el usuario de la aplicación
*/
export class UserEntity {
    private constructor(
        readonly id: string, 
        private name: string, 
        private email: Email,  //? Validamos el formato del email directamente desde la entidad
        private passwordHash: string,  //? La contraseña deberia esta hasheada y no como texto plano, ya que se almacena dentro de la bd
        readonly createdAt: Date, 
        readonly updateAt: Date,
    ) {}

    static create(id: string, name: string, email: Email, passwordHash: string, createdAt: Date, updateAt: Date) {
        return new UserEntity(id, name, email, passwordHash, createdAt, updateAt);
    }
}