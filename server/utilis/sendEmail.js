import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import {
    PASSWORD_RESET_REQUEST_TEMPLATE, ACCOUNT_SUSPENSION_TEMPLATE, VERIFY_EMAIL_CHANGE_TEMPLATE, EMAIL_CHANGE_SUCCESS_TEMPLATE, ACCOUNT_DELETED_EMAIL_TEMPLATE,
     PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, SIGNUP_SUCCESS_TEMPLATE, EMAIL_REVIEW_TEMPLATE, NEW_POST_TEMPLATE } from '../Email.js/Emailtemplates.js';
dotenv.config()

const SMTP_API = process.env.SMTP_KEY
const LOGIN_API = process.env.LOGIN_APY_KEY
const MASTER_API = process.env.MASTER_PASSWORD
const PORT_API = process.env.PORT_API_KEY
const EMAIL = process.env.EMAIL_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

//SENDING OF THE EMAIL FOR RESETTING PASSWORD
export const sendEmail = async (email, resetURL) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });

        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: "Passowrd Reset Request",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            text: "reset your password",
        });
    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};

//SEDNING EMAILS FOR PASSWORD SUCCESS CONFIRMATION
export const sendRestPasswordConfirmationEmail = async (email, username) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });

        const subject = "Password Reset Successful";


        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject,
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{username}", username),
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
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });
        const subject = "Email Verification";

        await transporter.sendMail({
            from: EMAIL, 
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
//sending of chaneg email
export const sendEmailChange = async (email, verificationCode) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });
        const subject = "Email Verification";

        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject,
            html: VERIFY_EMAIL_CHANGE_TEMPLATE.replace("{verificationCode}", verificationCode),
            text: `Your verification code is: ${verificationCode}`,
        });

    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
}

//confrim succes of email change
export const SuccessEmailChange = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });
        const subject = "succesfull Email Verification";

        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject,
            html: EMAIL_CHANGE_SUCCESS_TEMPLATE.replace("{email}", email),
        });

    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
}
//SENDING OF A SUCCESFULLY SIGNED UP
export const sendConfirmationEmail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });
        const subject = "Account confirmation"; 

        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject,
            html: SIGNUP_SUCCESS_TEMPLATE.replace("{email}", email),
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
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });

        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: "New Review Made",
            html: EMAIL_REVIEW_TEMPLATE.replace("{ReviewUrl}", ReviewUrl),
            text: "Check out new Reviews Made just for you",
        });

    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};

export const sendNewPost = async (email, postUrl, { productName, description, image, seller }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });

        const htmlContent = NEW_POST_TEMPLATE
            .replace("{ReviewUrl}", postUrl)
            .replace("{productName}", productName)
            .replace("{description}", description)
            .replace("{image}", image)
            .replace("{seller}", seller);

        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: " New Product Just Listed!",
            html: htmlContent,
            text: `New product: ${productName} listed by ${seller}. Check it out here: ${postUrl}`,
        });

    } catch (error) {
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};

export const sendSuspensionEmail = async () => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });
        const subject = "Account Suspension Notice";

        await transporter.sendMail({
            from: EMAIL,
            to: ADMIN_EMAIL,
            subject,
            html: ACCOUNT_SUSPENSION_TEMPLATE.replace("{ADMIN_EMAIL}", ADMIN_EMAIL),
            text: subject,
        });
        console.log(ADMIN_EMAIL)
    } catch (error) {
        console.error("Email failed:", error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};

//sending and email for someone who just left
export const sendEmailDeleted = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_API,
            port: PORT_API,
            secure: false,
            auth: {
                user: LOGIN_API,
                pass: MASTER_API,
            },
        });
        const subject = "Account deleted ";

        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject,
            html: ACCOUNT_DELETED_EMAIL_TEMPLATE.replace("{email}", email),
            text: subject,
        });
    } catch (error) {
        console.error("Email failed:", error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};




