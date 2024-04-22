import { IHttpError } from './types';

const isHttpError = (error: unknown): error is IHttpError => {
    if (typeof error == 'object' && error && 'statusCode' in error) {
        return true;
    }
    return false
};

export { isHttpError };