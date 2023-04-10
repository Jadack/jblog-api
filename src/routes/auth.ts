import { Router } from 'express';
import { signIn, signUp, profile } from '../controllers/auth.controller';
import { tokenValidation } from '../libs/validateToken';

const router: Router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/profile', tokenValidation, profile);

export default router;
