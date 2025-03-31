// utils/sendEmail.j
import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, resetURL) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: '891a43001@smtp-brevo.com', // Your Brevo-registered email
                pass: 'PX9anYsCpvrB8WNf', // From Brevo SMTP settings
            },
        });

        await transporter.sendMail({
            from: 'makandabrian2002@gmail.com',
            to: email,
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            subject,
            text,
        });
    } catch (error) {
        console.error('Email not sent:', error);
        throw error;
    }
};
