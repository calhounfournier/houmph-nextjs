import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { fullname, email, message } = await request.json();

    // Validate required fields
    if (!fullname || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Send email to recipient
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'forms@houmph.com',
      to: process.env.EMAIL_RECIPIENTS || 'alaindesmeules@mac.com',
      subject: 'New Form submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>User's IP Address: ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}</small></p>
      `,
      replyTo: email,
    });

    // Send auto-response to user
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'forms@houmph.com',
      to: email,
      subject: 'Thanks for contacting us',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Hi ${fullname},</p>
        <p>Thanks for contacting us. We will get back to you soon!</p>
        <p>Best regards,<br>The Houmph Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}