import { InvalidPasswordError } from "../errors/invalid-password.error";

export class Password {
    private constructor(private readonly value: string) {} 

    static create(raw: string): Password {
        const normalized = raw.trim();
        if (!/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(normalized)) {
            throw new InvalidPasswordError(normalized);
        }
        return new Password(normalized);
    }

    getValue(): string {
        return this.value;
    }
}