import jwt from 'jsonwebtoken';
import dotenv from "dotenv";


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export function generateAccessToken(hash) {
    dotenv.config();
    return jwt.sign(hash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "300d" });
  }

export default authMiddleware;
