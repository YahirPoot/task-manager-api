export class InvalidPasswordError extends Error {
    constructor (password: string) {
        super(`Password does not meet requirements`)
    }
}