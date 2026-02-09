// Azure Static Web Apps API - Contact Form Handler
// This function is automatically deployed with Static Web Apps
// Located in /api/contact/ directory

// For Static Web Apps, functions use a different structure
module.exports = async function (req, context) {
    context.log('Contact form submission received');

    // CORS is handled automatically by Static Web Apps
    // But we can add custom headers if needed
    const headers = {
        'Content-Type': 'application/json'
    };

    // Only allow POST
    if (req.method !== 'POST') {
        return {
            status: 405,
            headers: headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return {
                status: 400,
                headers: headers,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                status: 400,
                headers: headers,
                body: JSON.stringify({ error: 'Invalid email address' })
            };
        }

        // Get environment variables (set in Azure Static Web Apps Configuration)
        const recipientEmail = process.env.RECIPIENT_EMAIL || 'your.email@example.com';
        const sendGridApiKey = process.env.SENDGRID_API_KEY;

        if (sendGridApiKey) {
            // Send email using SendGrid
            const sgMail = require('@sendgrid/mail');
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
            // Fallback: Log to Static Web Apps logs
            context.log('Email would be sent:', {
                to: recipientEmail,
                from: email,
                subject: subject,
                name: name,
                message: message
            });
        }

        // Success response
        return {
            status: 200,
            headers: headers,
            body: JSON.stringify({
                success: true,
                message: 'Message sent successfully'
            })
        };

    } catch (error) {
        context.log.error('Error processing contact form:', error);
        return {
            status: 500,
            headers: headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
