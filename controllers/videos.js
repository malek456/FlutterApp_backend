import Video from "../models/video.js";



export const getVideoById = async (req, res) => {
    const courseId = req.params.courseId;

    console.log(`Received request to get video with course ID: ${courseId}`);
    if (!courseId) {
        console.error('No courseId provided in the request parameters.');
        return res.status(400).json({ message: 'courseId is required' });
    }

    try {
        const video = await Video.findOne({ course: courseId }); 

        if (!video) {
            console.error(`Video not found for courseId: ${courseId}`);
            return res.status(404).json({ message: 'Video not found' });
        }

        console.log(`Video found for courseId: ${courseId}`, video);

        res.json(video);
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};