import { Schema } from 'mongoose';
//import attachments from './attachments';
import attachments from './attachments.js'

const lectureSchema = new Schema({
    title: { type: String },
    description: { type: String },
    attachments: {type: attachments},
})

export default lectureSchema
