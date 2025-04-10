import nodemailer from 'nodemailer';
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, SIGNUP_SUCCESS_TEMPLATE, EMAIL_REVIEW_TEMPLATE } from '../Email.js/Emailtemplates.js';

// Template selector (add more templates as needed)

export const sendEmail = async (email, resetURL) => {
    // const resetURL = `http://localhost:5173/ResetPassword/${resetToken}`
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: { 
                user: "891a43002@smtp-brevo.com",
                pass: "M8RwpT9AmOX5E10H",
            },
        });


        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com',
            to: email,
            subject:"Passowrd Reset Request",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL) ,
            text: "reset your password", // Fallback for non-HTML clients
        });

    } catch (error) {
        // console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};

export const sendRestPasswordConfirmationEmail= async(email,username)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: "891a43002@smtp-brevo.com",
                pass: "M8RwpT9AmOX5E10H",
            },
        });


        const subject = "Password Reset Successful"; // Added subject
    

        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com',
            to: email,
            subject,
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{username}",username),
            text: subject,
        });

    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
}

export const sendEmailVerification = async (email, verificationCode) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587, 
            secure: false,
            auth: {
                user: "891a43002@smtp-brevo.com", 
                pass: "M8RwpT9AmOX5E10H", 
            },
            tls: {
                rejectUnauthorized: false 
            }
        });

        const subject = "Email Verification";

        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com', // Must be verified in your Brevo account
            to: email,
            subject,
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
            text: `Your verification code is: ${verificationCode}`,
        });

    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
}

export const sendConfirmationEmail = async (email)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: "891a43002@smtp-brevo.com",
                pass: "M8RwpT9AmOX5E10H",
            },
        });


        const subject = "Account confirmation"; // Added subject


        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com',
            to: email,
            subject,
            html: SIGNUP_SUCCESS_TEMPLATE.replace("{email}",email),
            text: subject,
        });

    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
}

export const sendReviewsEmail = async (email, ReviewUrl) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: "891a43002@smtp-brevo.com",
                pass: "M8RwpT9AmOX5E10H",
            },
        });


        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com',
            to: email,
            subject: "New Review Made",
            html: EMAIL_REVIEW_TEMPLATE.replace("{ReviewUrl}", ReviewUrl),
            text: "Check out new Reviews Made just for you", // Fallback for non-HTML clients
        });
        console.log("email"{email}, "here is the url ", { ReviewUrl })

    } catch (error) {
        // console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};