import { InvalidEmailError } from "../errors/invalid-email.error";

// users/domain/value-objects/email.vo.ts
export class Email {
    private constructor(private readonly value: string) {}

    static create(raw: string): Email {
        const normalized = raw.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
            throw new InvalidEmailError(normalized);
        }
            return new Email(normalized);
        }
    
    getValue(): string {
        return this.value;
    }
}