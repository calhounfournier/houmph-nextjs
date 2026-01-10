import { NextRequest, NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export async function POST(request: NextRequest) {
  try {
    // Validate Mailgun credentials exist
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      console.error('MAILGUN_API_KEY or MAILGUN_DOMAIN is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const { fullname, email, message } = await request.json();

    // Validate required fields
    if (!fullname || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Initialize Mailgun client
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
      url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net', // Use EU endpoint if needed: https://api.eu.mailgun.net
    });

    const fromEmail = process.env.EMAIL_FROM || `noreply@${process.env.MAILGUN_DOMAIN}`;
    const recipientEmail = process.env.EMAIL_RECIPIENTS || 'cafournier@me.com';

    // Send email to recipient
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: fromEmail,
      to: [recipientEmail],
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
      'h:Reply-To': email,
    });

    // Send auto-response to user
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: fromEmail,
      to: [email],
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
    // Log detailed error for debugging
    console.error('Error processing contact form:', error);

    // Return user-friendly error
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}