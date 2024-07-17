import express from 'express';
import {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../controllers/courses.js'; 
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/getAllCourses', getCourses);
router.get('/:courseId',authMiddleware, getCourseById);
router.post('/', createCourse);
router.put('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse);

export default router;
