

export class InvalidEmailError extends Error {
    constructor(email: string) {
        super(`Email is invalid`)
    }
}