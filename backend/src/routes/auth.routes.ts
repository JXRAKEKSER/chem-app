import { Router } from 'express';
import { registrate, login, getUserMe } from '../controllers/auth.controller';
import authGuard from '../middlewares/auth-guard.middleware';

const router = Router();

router.post('/register', registrate);
router.post('/login', login);
router.get('/me', authGuard, getUserMe);

export default router;
