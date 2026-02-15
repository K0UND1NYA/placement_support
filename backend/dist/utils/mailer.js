"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendOTPEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
const sendOTPEmail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: 'Your Login OTP',
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    });
};
exports.sendOTPEmail = sendOTPEmail;
const sendPasswordResetEmail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: 'Password Reset Request',
        text: `Your password reset OTP is ${otp}. It is valid for 10 minutes.`
    });
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
