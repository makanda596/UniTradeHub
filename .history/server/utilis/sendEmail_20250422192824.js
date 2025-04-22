import nodemailer from 'nodemailer';
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, SIGNUP_SUCCESS_TEMPLATE, EMAIL_REVIEW_TEMPLATE } from '../Email.js/Emailtemplates.js';


//SENDING OF THE EMAIL FOR RESETTING PASSWORD
export const sendEmail = async (email, resetURL) => {
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
            text: "reset your password", 
        });

    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};

//SEDNING EMAILS FOR PASSWORD SUCCESS CONFIRMATION
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


        const subject = "Password Reset Successful"; 
    

        await transporter.sendMail({
            from: 'unitradehubs@gmail.com',
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

//SEDNING A VERIFICATION CODE
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
            from: 'unitradehubs@gmail.com', 
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

//SENDING OF A SUCCESFULLY SIGNED UP
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


        const subject = "Account confirmation"; 


        await transporter.sendMail({
            from: 'unitradehubs@gmail.com',
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

//SENDING OF REVIEWS EMAIL
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
            from: 'unitradehubs@gmail.com',
            to: email,
            subject: "New Review Made",
            html: EMAIL_REVIEW_TEMPLATE.replace("{ReviewUrl}", ReviewUrl),
            text: "Check out new Reviews Made just for you", 
        });

    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};