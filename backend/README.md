# Portfolio Backend - Low-Cost Serverless Solutions

This directory contains serverless function implementations for the portfolio contact form. All solutions are designed to keep costs low, with free tiers available for each platform.

## 🎯 Cost Comparison

| Platform | Free Tier | Paid Tier Starts At |
|----------|-----------|---------------------|
| **Azure Functions** | 1M requests/month | ~$0.20 per million requests |
| **Netlify Functions** | 125K requests/month | $19/month (Pro) |
| **Vercel Functions** | 100GB-hours/month | $20/month (Pro) |

## 📁 Structure

```
backend/
├── azure/          # Azure Functions implementation
├── netlify/        # Netlify Functions implementation
├── vercel/         # Vercel Serverless Functions implementation
└── README.md       # This file
```

## 🚀 Quick Start

### Option 1: Azure Functions (Recommended for Azure Users)

Since you're already using Azure, this is the most integrated solution.

#### Prerequisites
- Azure account (free tier available)
- Azure Functions Core Tools: `npm install -g azure-functions-core-tools`
- SendGrid account (free tier: 100 emails/day) - [Sign up here](https://sendgrid.com)

#### Setup Steps

1. **Install dependencies:**
   ```bash
   cd backend/azure
   npm install
   ```

2. **Configure local settings:**
   ```bash
   cp local.settings.json.example local.settings.json
   ```
   Edit `local.settings.json` and add your:
   - `RECIPIENT_EMAIL`: Your email address
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `SENDER_EMAIL`: Verified sender email in SendGrid

3. **Test locally:**
   ```bash
   func start
   ```
   The function will be available at `http://localhost:7071/api/contact`

4. **Deploy to Azure:**
   ```bash
   # Login to Azure
   az login
   
   # Create a Function App (if you don't have one)
   az functionapp create \
     --resource-group <your-resource-group> \
     --consumption-plan-location <region> \
     --runtime node \
     --runtime-version 18 \
     --functions-version 4 \
     --name <your-function-app-name> \
     --storage-account <your-storage-account>
   
   # Deploy the function
   func azure functionapp publish <your-function-app-name>
   ```

5. **Set environment variables in Azure:**
   - Go to Azure Portal → Your Function App → Configuration
   - Add Application Settings:
     - `RECIPIENT_EMAIL`: Your email
     - `SENDGRID_API_KEY`: Your SendGrid API key
     - `SENDER_EMAIL`: Verified sender email

6. **Update frontend:**
   Edit `script.js` and update `API_ENDPOINT`:
   ```javascript
   const API_ENDPOINT = 'https://your-function-app.azurewebsites.net/api/contact';
   ```

#### SendGrid Setup (Free Tier)

1. Sign up at [SendGrid](https://sendgrid.com) (free tier: 100 emails/day)
2. Verify your sender email address
3. Create an API key in Settings → API Keys
4. Add the API key to your Azure Function App settings

---

### Option 2: Netlify Functions

Great if you're deploying your frontend to Netlify.

#### Prerequisites
- Netlify account (free tier available)
- SendGrid account (optional, for email sending)

#### Setup Steps

1. **Install dependencies:**
   ```bash
   cd backend/netlify
   npm install
   ```

2. **Copy function to your project:**
   ```bash
   # From your project root
   mkdir -p netlify/functions
   cp backend/netlify/functions/contact.js netlify/functions/
   cp backend/netlify/package.json ./
   ```

3. **Set environment variables in Netlify:**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add:
     - `RECIPIENT_EMAIL`: Your email address
     - `SENDGRID_API_KEY`: Your SendGrid API key (optional)
     - `SENDER_EMAIL`: Verified sender email (optional)

4. **Deploy:**
   ```bash
   # If using Netlify CLI
   netlify deploy --prod
   
   # Or connect your Git repository to Netlify
   ```

5. **Update frontend:**
   Edit `script.js`:
   ```javascript
   const API_ENDPOINT = '/.netlify/functions/contact';
   ```

---

### Option 3: Vercel Functions

Perfect if you're deploying to Vercel.

#### Prerequisites
- Vercel account (free tier available)
- SendGrid account (optional)

#### Setup Steps

1. **Install dependencies:**
   ```bash
   cd backend/vercel
   npm install
   ```

2. **Copy API route to your project:**
   ```bash
   # From your project root
   mkdir -p api
   cp backend/vercel/api/contact.js api/
   cp backend/vercel/package.json ./
   ```

3. **Set environment variables in Vercel:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add:
     - `RECIPIENT_EMAIL`: Your email address
     - `SENDGRID_API_KEY`: Your SendGrid API key (optional)
     - `SENDER_EMAIL`: Verified sender email (optional)

4. **Deploy:**
   ```bash
   # If using Vercel CLI
   vercel --prod
   
   # Or connect your Git repository to Vercel
   ```

5. **Update frontend:**
   Edit `script.js`:
   ```javascript
   const API_ENDPOINT = '/api/contact';
   ```

---

## 🔧 Configuration

### Environment Variables

All implementations use these environment variables:

- `RECIPIENT_EMAIL`: Email address where contact form submissions will be sent
- `SENDGRID_API_KEY`: (Optional) SendGrid API key for sending emails
- `SENDER_EMAIL`: (Optional) Verified sender email address in SendGrid

### Without SendGrid

If you don't want to use SendGrid, the functions will log submissions to:
- **Azure**: Application Insights / Log Analytics
- **Netlify**: Function logs (viewable in dashboard)
- **Vercel**: Function logs (viewable in dashboard)

You can then set up webhooks, store in a database, or use other email services.

---

## 🛡️ Security Considerations

1. **CORS**: Update `Access-Control-Allow-Origin` to your actual domain in production
2. **Rate Limiting**: Consider adding rate limiting to prevent abuse
3. **Input Validation**: Already implemented, but review for your use case
4. **Spam Protection**: Consider adding reCAPTCHA or similar

---

## 📊 Monitoring

### Azure Functions
- View logs in Azure Portal → Function App → Logs
- Set up Application Insights for advanced monitoring

### Netlify Functions
- View logs in Netlify Dashboard → Functions → Logs

### Vercel Functions
- View logs in Vercel Dashboard → Functions → Logs

---

## 🔄 Alternative Email Services

If you prefer not to use SendGrid, you can modify the functions to use:

- **Azure Communication Services** (Azure-native)
- **AWS SES** (if using AWS)
- **Mailgun** (free tier: 5,000 emails/month)
- **Postmark** (free tier: 100 emails/month)
- **Nodemailer** with SMTP (Gmail, Outlook, etc.)

---

## 🐛 Troubleshooting

### Function not receiving requests
- Check CORS settings
- Verify the API endpoint URL in `script.js`
- Check function logs for errors

### Emails not sending
- Verify SendGrid API key is correct
- Check sender email is verified in SendGrid
- Review SendGrid dashboard for delivery issues

### CORS errors
- Update `Access-Control-Allow-Origin` to match your domain
- Ensure OPTIONS method is handled

---

## 💡 Cost Optimization Tips

1. **Use free tiers** - All platforms offer generous free tiers
2. **Monitor usage** - Set up alerts to avoid unexpected charges
3. **Cache responses** - If adding more endpoints later
4. **Combine with static hosting** - Keep frontend static, backend serverless

---

## 📝 Next Steps

1. Choose your preferred platform
2. Set up SendGrid (or alternative email service)
3. Deploy your chosen function
4. Update `script.js` with your API endpoint
5. Test the contact form
6. Monitor usage and costs

---

## 🆘 Need Help?

- Azure Functions: [Documentation](https://docs.microsoft.com/azure/azure-functions/)
- Netlify Functions: [Documentation](https://docs.netlify.com/functions/overview/)
- Vercel Functions: [Documentation](https://vercel.com/docs/concepts/functions/serverless-functions)
- SendGrid: [Documentation](https://docs.sendgrid.com/)
