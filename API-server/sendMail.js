import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendSummaryEmail({ to, summary }) {
  var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  try {
    await transport.verify();
    console.log("SMTP connection successful");

    const info = await transport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: to,
      subject: "Your AI Meeting Summary",
      text: summary,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
