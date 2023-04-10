import { Router } from 'express';
const router: Router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to Jadack Blog');
});

export default router;
