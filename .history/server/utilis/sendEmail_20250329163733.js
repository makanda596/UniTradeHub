import nodemailer from 'nodemailer';
import {  passwordResetTemplate } from '../Email.js/Emailtemplates.js';

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
            html: passwordResetTemplate.replace("{resetURL}", resetURL), 
            text: "reset your password", // Fallback for non-HTML clients
        });

        console.log(`Email sent to ${email}`);
        console.log(resetURL);
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