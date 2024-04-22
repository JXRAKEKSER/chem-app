class ValidationError extends Error {
    public statusCode = 400;

    constructor(message: string) {
        super(message);
    }
}

export default ValidationError;
