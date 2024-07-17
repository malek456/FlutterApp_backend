import User from '../models/user.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateAccessToken } from '../middlewares/authMiddleware.js';

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({ status: "error", message: err })
                    }
                    if (result) {
                        const hash = {
                            id: user._id,
                            role: user.role
                        }
                        const accessToken = generateAccessToken(hash)

                        res.status(200).send(JSON.stringify({ //200 OK
                            status: 'success',
                            message: "logged in successfully",
                            user: {
                                _id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                username: user.username,
                                gender: user.gender,
                                email: user.email,
                                password: user.password,
                                phone: user.phone,
                                role: user.role,
                                token: accessToken,
                            },
                        }))

                    } else {
                        res.status(200).send(JSON.stringify({ //201 password
                            status: 'error',
                            message: "incorrect password"
                        }))


                    }
                })
            } else {
                res.status(200).send(JSON.stringify({ //200 OK
                    status: 'error',
                    message: "user not found"
                }))
            }
        })
};


export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            // Add other fields as needed
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }


};


export const GoogleLogin = async (req, res) => {
    try {
      const userData = req.body; // Assuming req.body contains the user data from Flutter
  
      // Check if user already exists in the database
      let user = await User.findOne({ email: userData.email });
  
      if (!user) {
        // If user doesn't exist, create a new user
        user = new User({
          password: userData.password, // Assuming you store uid as password (adjust as needed)
          firstName: userData.displayName,
          email: userData.email,
          // Add more fields as needed
        });
  
        await user.save();
        console.log('New user created:', user);
      }
  
      // Respond with success message
      res.status(200).json({ message: 'User data processed successfully' });
    } catch (err) {
      console.error('Error processing user data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
