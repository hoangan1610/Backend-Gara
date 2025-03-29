import nodemailer from 'nodemailer';




const sendEmail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        tls: {
            rejectUnauthorized: false
        },
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return error;
        } else {
            console.log('Email sent: ' + info.response);
            return info;
        }
    });
}

export default sendEmail;