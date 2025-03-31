import nodemailer from 'nodemailer';
import {  PASSWORD_RESET_REQUEST_TEMPLATE, passwordResetTemplate } from '../Email.js/Emailtemplates.js';

// Template selector (add more templates as needed)

export const sendEmail = async (email, resetURL) => {
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

        // Use %%RESET_URL%% as placeholder
        const emailHtml = PASSWORD_RESET_REQUEST_TEMPLATE.replace(/%%RESET_URL%%/g, resetURL);

        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com', // Professional sender
            to: email,
            subject: "Password Reset Request",
            html: emailHtml,
            text: `To reset your password, visit: ${resetURL}`,
        });

        console.log(`Email sent to ${email}`);
        console.log("Reset URL:", resetURL); // Verify URL is correct
    } catch (error) {
        console.error('Email failed:', error);
        throw new Error(`Email delivery failed: ${error.message}`);
    }
};

// export const sendRestPasswordConfirmationEmail= async(email)=>{
//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp-relay.brevo.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: "891a43001@smtp-brevo.com",
//                 pass: "PX9anYsCpvrB8WNf",
//             },
//         });


//         await transporter.sendMail({
//             from: 'makandabrian2002@gmail.com',
//             to: email,
//             subject,
//             html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//             text: subject, // Fallback for non-HTML clients
//         });

//         console.log(`Email sent to ${email}`);
//     } catch (error) {
//         console.error('Email failed:', error);
//         throw new Error(`Email delivery failed: ${error.message}`);
//     }
// }