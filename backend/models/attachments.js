import { Schema, model } from 'mongoose';
import lectureSchema from './lecture.schema.js';

const attachmentsSchema = new Schema({
    title: { type: String },
    video: {type: String}
    },
 { timestamps: true })


export default attachmentsSchema