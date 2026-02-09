# Azure Static Web Apps Deployment Guide (Azure DevOps)

This guide will help you deploy your portfolio to Azure Static Web Apps using Azure DevOps Pipelines, keeping costs at **$0/month** with the free tier.

## Cost Breakdown

**Azure Static Web Apps Free Tier:**
- 100 GB bandwidth/month
- Custom domains with free SSL certificates
- Azure Functions integration (1M requests/month)
- Staging environments for pull requests
- **Total Cost: $0/month**

**Azure DevOps Free Tier:**
- 1 free Microsoft-hosted parallel job (1,800 minutes/month)
- Unlimited private repos
- 5 users free
- **Total Cost: $0/month**

## Prerequisites

1. **Azure Account** - [Sign up for free](https://azure.microsoft.com/free/)
2. **Azure DevOps Account** - [Sign up for free](https://dev.azure.com)
3. **SendGrid Account** (optional) - [Free tier: 100 emails/day](https://sendgrid.com)

---

## Deployment Steps

### Step 1: Create Azure Static Web App

**Via Azure Portal:**

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Static Web App"**
4. Click **"Create"**
5. Fill in:
   - **Subscription**: Your Azure subscription
   - **Resource Group**: Create new or use existing (e.g., `portfolio-rg`)
   - **Name**: `portfolio-landing` (or your preferred name)
   - **Plan type**: **Free**
   - **Region**: Choose closest to you
   - **Source**: **Other** (since we're using Azure DevOps, not GitHub)
6. Click **"Review + create"** then **"Create"**

**Via Azure CLI:**

```bash
# Login to Azure
az login

# Create resource group
az group create --name portfolio-rg --location eastus

# Create Static Web App (no source connection - we'll use Azure DevOps)
az staticwebapp create \
  --name portfolio-landing \
  --resource-group portfolio-rg \
  --location eastus \
  --sku Free
```

### Step 2: Get the Deployment Token

1. Go to Azure Portal -> Your Static Web App
2. Click **"Manage deployment token"** in the top toolbar
3. Copy the token — you'll need it for Azure DevOps

### Step 3: Set Up Azure DevOps

#### 3a. Create a Project

1. Go to [dev.azure.com](https://dev.azure.com)
2. Click **"+ New project"**
3. Name: `PortfolioLanding`
4. Visibility: Private (or Public, your choice)
5. Click **"Create"**

#### 3b. Push Your Code to Azure Repos

```bash
# Initialize git (if not already done)
cd c:\projects\PortfolioLanding
git init
git add .
git commit -m "Initial commit: portfolio landing page with Azure Functions backend"

# Add Azure DevOps as remote
git remote add origin https://dev.azure.com/<your-org>/<your-project>/_git/PortfolioLanding

# Push to Azure Repos
git push -u origin main
```

#### 3c. Add the Deployment Token as a Pipeline Variable

**Option A: Pipeline variable (simpler)**

1. Go to Azure DevOps -> Pipelines -> Library
2. Click **"+ Variable group"**
3. Name: `portfolio-variables`
4. Click **"+ Add"**:
   - **Name**: `DEPLOYMENT_TOKEN`
   - **Value**: Paste your Static Web App deployment token
   - Click the **lock icon** to make it secret
5. Click **"Save"**

**Option B: Service connection (more secure for teams)**

1. Go to Project Settings -> Service connections
2. Click **"New service connection"**
3. Choose **"Azure Resource Manager"**
4. Follow the prompts to authenticate

#### 3d. Create the Pipeline

1. Go to Azure DevOps -> **Pipelines**
2. Click **"New pipeline"**
3. Select **"Azure Repos Git"**
4. Select your repository
5. Select **"Existing Azure Pipelines YAML file"**
6. Path: `/azure-pipelines.yml`
7. Click **"Continue"**
8. Review the pipeline, then click **"Run"**

**First run:** You may be prompted to permit access to the variable group and environment. Click **"Permit"** on each.

### Step 4: Configure Environment Variables in Azure

1. Go to Azure Portal -> Your Static Web App -> **Configuration**
2. Click **"+ Add"** for each:
   - `RECIPIENT_EMAIL`: Your email address
   - `SENDGRID_API_KEY`: Your SendGrid API key (optional)
   - `SENDER_EMAIL`: Verified sender email in SendGrid (optional)
3. Click **"Save"**

### Step 5: Set Up SendGrid (Optional)

1. Sign up at [sendgrid.com](https://sendgrid.com) (free: 100 emails/day)
2. Verify your sender email in Settings -> Sender Authentication
3. Create API key in Settings -> API Keys
4. Add `SENDGRID_API_KEY` and `SENDER_EMAIL` to Azure Static Web App Configuration

**Without SendGrid:** Form submissions are logged and viewable in Azure Portal -> Functions -> Logs.

### Step 6: Verify Deployment

1. After the pipeline succeeds, go to Azure Portal -> Your Static Web App
2. Your site URL: `https://<your-app-name>.azurestaticapps.net`
3. Test the contact form

---

## Local Development

### Test Functions Locally

1. **Install Azure Static Web Apps CLI:**
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Install API dependencies:**
   ```bash
   cd api
   npm install
   cd ..
   ```

3. **Run locally:**
   ```bash
   swa start
   ```
   - Frontend: `http://localhost:4280`
   - API: `http://localhost:7071/api`

4. **Set local environment variables:**
   Create `api/local.settings.json`:
   ```json
   {
     "Values": {
       "RECIPIENT_EMAIL": "your.email@example.com",
       "SENDGRID_API_KEY": "your-api-key",
       "SENDER_EMAIL": "noreply@yourdomain.com"
     }
   }
   ```

---

## Custom Domain Setup

1. Go to Azure Portal -> Static Web App -> **Custom domains**
2. Click **"Add"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. SSL is provisioned automatically (free)

---

## Monitoring

- **Pipeline runs**: Azure DevOps -> Pipelines -> Recent runs
- **App logs**: Azure Portal -> Static Web App -> Functions -> Logs
- **App metrics**: Azure Portal -> Static Web App -> Metrics
- **Usage**: Monitor bandwidth and function executions

---

## Troubleshooting

### Pipeline Fails

1. **Check pipeline logs:**
   - Azure DevOps -> Pipelines -> Select run -> View logs

2. **Common issues:**
   - `DEPLOYMENT_TOKEN` not set: Add it to the variable group
   - Variable group not linked: Click "Permit" when prompted
   - npm install fails: Check `api/package.json`

### Function Not Working

1. **Check logs:**
   - Azure Portal -> Static Web App -> Functions -> Logs

2. **Verify environment variables:**
   - Azure Portal -> Static Web App -> Configuration

3. **Test locally:**
   ```bash
   swa start
   ```

### Emails Not Sending

1. Verify SendGrid API key is correct
2. Check sender email is verified in SendGrid
3. Review SendGrid dashboard for delivery errors
4. Check function logs in Azure Portal

### Deployment Token Expired

1. Go to Azure Portal -> Static Web App
2. Click **"Manage deployment token"** -> **"Reset"**
3. Update the token in Azure DevOps variable group

---

## Security Best Practices

1. **Deployment token**: Always store as a secret variable (lock icon)
2. **CORS**: Handled automatically by Azure Static Web Apps
3. **Rate limiting**: Azure Functions has built-in throttling
4. **Input validation**: Already implemented in the contact function
5. **Branch policies**: Set up branch policies in Azure Repos to require PR reviews

---

## Scaling

The free tier handles most portfolio sites easily. If you exceed limits:

- **Bandwidth**: $0.08/GB after 100GB
- **Functions**: $0.20 per million requests after 1M

For a typical portfolio, you'll stay within free tier limits.

---

## Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Static Web Apps with Azure DevOps](https://docs.microsoft.com/azure/static-web-apps/publish-devops)
- [Azure DevOps Pipelines](https://docs.microsoft.com/azure/devops/pipelines/)
- [SendGrid Documentation](https://docs.sendgrid.com/)

---

**Estimated Monthly Cost: $0**

Your portfolio is hosted on Azure with a fully functional backend and CI/CD pipeline, all for free!
