import express from 'express';
import { getVideoById

 } from '../controllers/videos.js';

const router = express.Router();

router.get('/:courseId', getVideoById);


export default router;
