import { Request, Response, NextFunction } from 'express';
import { isHttpError } from '../errors/typeGuard';

export default (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (isHttpError(error)) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: 'Ошибка на сервере' });
}