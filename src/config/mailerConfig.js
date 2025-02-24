import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASSWORD } from "../config/serverConfig.js";

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
    service: "gmail", // change if using another email service
    secure: false,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
});

// A simple function to send an email
const sendMail = async (to, subject, text, html) => {
    const mailOptions = {
        from: {
            name: "Pizza App",
            address: EMAIL_USER
        },
        to,
        subject,
        text,  // plain text body
        html,  // html body (optional)
    };

    // Actually send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email info", info);
        console.log("Email sent:", info.response);
    } catch (error) {
        if (error.code === 'EENVELOPE') {
            return {
                success: false,
                error: 'Invalid email address format'
            };
        } else if (error.code === 'ECONNECTION') {

        } else {
            return {
                success: false,
                error: error.message
            };
        }
    }
};

export default sendMail;