import { User } from './userModel.js';
import { sendVerificationCode } from './emailService.js';
import bcrypt from 'bcrypt';

// Register user and send verification code
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, gender } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            gender
        });

        // Generate and send verification code
        const verificationCode = user.generateVerificationCode();
        await sendVerificationCode(user.email, verificationCode);
        await user.save();

        res.status(201).json({
            message: 'User registered. Verification code sent to email.',
            userId: user._id,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Verify user with code
export const verifyUser = async (req, res) => {
    try {
        const { email, code } = req.body;

        const user = await User.findOne({
            email,
            verificationCode: code,
            verificationCodeExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired verification code'
            });
        }

        // Mark user as verified and clear code
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Verification failed', error: error.message });
    }
};

// Resend verification code
export const resendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        // Generate and send new code
        const newCode = user.generateVerificationCode();
        await sendVerificationCode(user.email, newCode);
        await user.save();

        res.status(200).json({
            message: 'New verification code sent',
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to resend code', error: error.message });
    }
};


import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVerificationCode = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Your Verification Code',
        html: `
            <h2>Email Verification</h2>
            <p>Your verification code is:</p>
            <h3 style="font-size: 24px; letter-spacing: 2px;">${code}</h3>
            <p>This code will expire in 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification code sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

import express from 'express';
import {
    registerUser,
    verifyUser,
    resendVerificationCode
} from '../controllers/authController.js';

const router = express.Router();

// Registration
router.post('/register', registerUser);

// Verify with code
router.post('/verify', verifyUser);

// Resend code
router.post('/resend-code', resendVerificationCode);

export default router;


import { useState } from 'react';
import axios from 'axios';

const VerificationForm = ({ email }) => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/api/auth/verify', { email, code });
            setMessage(response.data.message);
            // Redirect or show success message
        } catch (error) {
            setMessage(error.response?.data?.message || 'Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/auth/resend-code', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to resend code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Verify Your Email</h2>
            <p>We sent a 6-digit code to {email}</p>

            <form onSubmit={handleVerify}>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
            </form>

            <button onClick={handleResend} disabled={isLoading}>
                Resend Code
            </button>

            {message && <p>{message}</p>}
        </div>
    );
};