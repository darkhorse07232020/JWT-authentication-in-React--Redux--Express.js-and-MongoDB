
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
require('dotenv').config();

const SMTP_FROM = process.env.SMTP_FROM;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT as unknown as number;

const nodemailerOptions: SMTPTransport.Options = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  },
};

console.log(nodemailerOptions);

const transport = createTransport(nodemailerOptions);
transport.verify((err, success) => {
  if (err) console.error(err);
  else console.log('Your config is correct');
});
const sendConfirmationEmail = async (email: string, subject: string, html: string) => {
  try {
    await transport.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: subject,
      html: html,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  };
};

export default sendConfirmationEmail;