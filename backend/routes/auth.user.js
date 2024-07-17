import express from 'express';
import { login, register , GoogleLogin} from '../controllers/auth.user.js'; // Adjust the path based on your project structure



const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/login/google', GoogleLogin);


export default router;
