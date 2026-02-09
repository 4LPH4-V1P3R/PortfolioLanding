// Vercel Serverless Functions - Contact Form Handler
// Deploy: Place this in /api/contact.js
// Free tier: 100GB-hours/month

const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Update to your domain in production
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email address' });
            return;
        }

        // Get environment variables (set in Vercel dashboard)
        const recipientEmail = process.env.RECIPIENT_EMAIL || 'your.email@example.com';
        const sendGridApiKey = process.env.SENDGRID_API_KEY;

        if (sendGridApiKey) {
            sgMail.setApiKey(sendGridApiKey);

            const msg = {
                to: recipientEmail,
                from: process.env.SENDER_EMAIL || 'noreply@yourdomain.com',
                subject: `Portfolio Contact: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `,
                replyTo: email
            };

            await sgMail.send(msg);
        } else {
            // Fallback: Log to Vercel logs
            console.log('Contact form submission:', {
                name,
                email,
                subject,
                message
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
