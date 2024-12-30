import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create a test account if no SMTP config is provided
  const testAccount = await nodemailer.createTestAccount();

  // Create transporter (replace with your SMTP config in production)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || testAccount.user,
      pass: process.env.SMTP_PASS || testAccount.pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"GIF Generator Feedback" <${email}>`,
      to: process.env.FEEDBACK_EMAIL || "bilvamediatech@gmail.com",
      subject: "New Feedback Submission",
      text: `Name: ${name}\nEmail: ${email}\n\nFeedback:\n${feedback}`,
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Feedback:</h3>
        <p>${feedback}</p>
      `,
    });

    if (testAccount) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).json({ message: 'Error sending feedback' });
  }
}
