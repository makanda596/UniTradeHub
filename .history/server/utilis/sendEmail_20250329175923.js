import nodemailer from 'nodemailer';
import {  PASSWORD_RESET_REQUEST_TEMPLATE } from '../Email.js/Emailtemplates.js';

// Template selector (add more templates as needed)

export const sendEmail = async (email,  resetURL) => {
    // const resetURL = `http://localhost:5173/ResetPassword/${resetToken}`
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
            subject:"send email",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), 
            text: "reset your password", // Fallback for non-HTML clients
        });

       
    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};

export const sendRestPasswordConfirmationEmail= async(email)=>{
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


        const subject = "Password Reset Successful"; // Added subject
        const PASSWORD_RESET_SUCCESS_TEMPLATE = `
            <h1>Password Reset Successful</h1>
            <p>Your password has been successfully reset.</p>
            <p>If you didn't request this change, please contact us immediately.</p>
        `; // Added template

        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com',
            to: email,
            subject,
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            text: subject,
        });

        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
}