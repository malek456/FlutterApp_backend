import { ParticipationStatus } from "../models/participationStatus.js";
import Participation from "../models/participation.js";
import Course from '../models/course.js';

export const requestParticipation = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId).populate('formateur').populate('category');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const participation = new Participation({
            course: req.params.courseId,
            formateur: course.formateur._id,
            etudiant: req.user.id,
            approved: ParticipationStatus.pending
        });

        const savedParticipation = await participation.save();

        res.status(201).json({
            status: "success",
            message: "Course enrolled!",
            data: savedParticipation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An error occurred when adding participation!"
        });
    }
};

export const getParticipationByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const participations = await Participation.find({ etudiant: userId })
            .populate('course')
            .populate('formateur');

        if (!participations.length) {
            return res.status(404).json({ message: 'No participations found for this user' });
        }

        res.json(participations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
