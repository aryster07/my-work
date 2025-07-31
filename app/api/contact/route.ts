import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'aryanrana762@gmail.com',
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #DAA520; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #DAA520; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #666;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
            <p style="margin: 0; color: #888; font-size: 14px;">
              This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      // Also send a plain text version
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        Sent from portfolio contact form at ${new Date().toLocaleString()}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
