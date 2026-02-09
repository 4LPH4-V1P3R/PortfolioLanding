// Azure Functions - Contact Form Handler
// This function sends emails using SendGrid (free tier: 100 emails/day)
// Alternative: Use Azure Communication Services, or other email services

module.exports = async function (context, req) {
    context.log('Contact form submission received');

    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*', // Update this to your domain in production
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 200,
            headers: headers
        };
        return;
    }

    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            context.res = {
                status: 400,
                headers: headers,
                body: {
                    error: 'All fields are required'
                }
            };
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            context.res = {
                status: 400,
                headers: headers,
                body: {
                    error: 'Invalid email address'
                }
            };
            return;
        }

        // Get recipient email from environment variable
        const recipientEmail = process.env.RECIPIENT_EMAIL || 'your.email@example.com';
        
        // Option 1: Send email using SendGrid (recommended for Azure)
        // Install: npm install @sendgrid/mail
        // Set SENDGRID_API_KEY in Azure Function App Settings
        
        if (process.env.SENDGRID_API_KEY) {
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
                to: recipientEmail,
                from: process.env.SENDER_EMAIL || 'noreply@yourdomain.com', // Verified sender in SendGrid
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
            // Option 2: Log to Azure Application Insights / Log Analytics
            // This is a fallback if SendGrid is not configured
            context.log('Email would be sent:', {
                to: recipientEmail,
                from: email,
                subject: subject,
                name: name,
                message: message
            });

            // You can also store in Azure Table Storage, Cosmos DB, or other storage
            // For now, we'll just log it
        }

        // Success response
        context.res = {
            status: 200,
            headers: headers,
            body: {
                success: true,
                message: 'Message sent successfully'
            }
        };

    } catch (error) {
        context.log.error('Error processing contact form:', error);
        context.res = {
            status: 500,
            headers: headers,
            body: {
                error: 'Internal server error',
                message: error.message
            }
        };
    }
};
