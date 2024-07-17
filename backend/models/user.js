import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    gender: { type: String },
    email: { type: String},
    password: { type: String},
    phone: { type: String },
    avatar: { type: String },
    verified: { type: Number },
    role:{ type: String },
}, { timestamps: true })

const User = mongoose.model('users', userSchema);

export default User;
