import { Schema, model } from 'mongoose';
import lectureSchema from './lecture.schema.js';

const videoSchema = new Schema({
    title: { type: String },
    description: { type: String },
    trailer: { type: String },
    //videos: {type:[String] },
    course: {
        type: Schema.ObjectId,
        ref: 'courses'
    },
}, { timestamps: true })

const Video = model('videos', videoSchema);

export default Video