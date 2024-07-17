import Course from '../models/course.js'; 
import { ParticipationStatus } from '../models/participationStatus.js';
import Participation from '../models/participation.js';





export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('category formateur').exec();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getCourseById = async (req, res, next) => {
    try {
        console.log(`Received request to get course with ID: ${req.params.courseId}`);

        const course = await Course.findOne({ '_id': req.params.courseId }).populate('formateur').populate('category');

        //console.log('Course found:', course);

        if (!course) {
            //console.log('Course not found');
            return res.status(404).json({ message: 'Course not found' });
        }

        const participation = await Participation.findOne({ 'course': req.params.courseId, 'etudiant': req.user.id });
        //console.log('Participation found:', participation);

        const isUserParticipated = (participation) ? participation.approved : ParticipationStatus.isNotSubscribed;
        //console.log('User participation status:', isUserParticipated);

        return res.json({ ...course._doc, isParticipated: isUserParticipated });
    } catch (error) {
        //console.error('Error fetching course by ID:', error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export const createCourse = async (req, res) => {
    const newCourse = new Course(req.body);
    try {
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateCourse = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(updatedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteCourse = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


