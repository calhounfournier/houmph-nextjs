import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { fullname, email, message } = await request.json();

    // Validate required fields
    if (!fullname || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const emailBody = `You have received a new form submission. Details below:
fullname: ${fullname}
email: ${email}
message: ${message}

User's IP Address: ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}`;

    const autoResponseBody = `Hi

Thanks for contacting us. We will get back to you soon!

Regards`;

    // Send email to recipient
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'forms@houmph.com',
      to: process.env.EMAIL_RECIPIENTS || 'alaindesmeules@mac.com',
      subject: 'New Form submission',
      text: emailBody,
      replyTo: email,
    });

    // Send auto-response to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'forms@houmph.com',
      to: email,
      subject: 'Thanks for contacting us',
      text: autoResponseBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
