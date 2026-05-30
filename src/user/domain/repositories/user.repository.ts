import { UserEntity } from "../entities/user.entity";
import { Email } from "../value-objects/email.vo";

export abstract class UserRepository {
    abstract getUserByEmail(email: Email): Promise<UserEntity | null>;
}