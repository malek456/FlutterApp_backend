import express from 'express';
import { requestParticipation, getParticipationByUser } from '../controllers/participations.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

// Route for requesting participation
router.post('/ParticipationRequest/:courseId',authMiddleware,requestParticipation);
router.get('/user/:userId', authMiddleware, getParticipationByUser);

export default router;
