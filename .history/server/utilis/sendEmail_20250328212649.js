import nodemailer from 'nodemailer';
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from '../Email.js/Emailtemplates.js';

// Template selector (add more templates as needed)

export const sendEmail = async (email, subject, resetURL) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: "891a43001@smtp-brevo.com",
                pass: "PX9anYsCpvrB8WNf",
            },
        });


        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com',
            to: email,
            subject,
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{resetURL}", resetURL),
            text: subject, // Fallback for non-HTML clients
        });

        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};