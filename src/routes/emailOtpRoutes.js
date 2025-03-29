// routes/emailOtpRoutes.js
import express from 'express';
import { EmailOTPController } from '../services/EmailOTPController';

const router = express.Router();
const emailOTPController = new EmailOTPController();

router.post('/send-email-otp', emailOTPController.sendEmailOTP.bind(emailOTPController));
router.post('/verify-email-otp', emailOTPController.verifyEmailOTP.bind(emailOTPController));

export default router;
