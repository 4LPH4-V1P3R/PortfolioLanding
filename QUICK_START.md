# Quick Start Guide - Azure Static Web Apps + Azure DevOps

Get your portfolio live on Azure in 10 minutes!

## Prerequisites

- Azure account ([free signup](https://azure.microsoft.com/free/))
- Azure DevOps account ([free signup](https://dev.azure.com))

## Steps

### 1. Create Static Web App (2 minutes)

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"** -> Search **"Static Web App"**
3. Click **"Create"**
4. Fill in:
   - **Name**: `portfolio-landing`
   - **Plan type**: **Free**
   - **Region**: Choose closest
   - **Source**: **Other** (we use Azure DevOps)
5. Click **"Review + create"** -> **"Create"**

### 2. Copy the Deployment Token (30 seconds)

1. Go to your new Static Web App in Azure Portal
2. Click **"Manage deployment token"** in the toolbar
3. Copy the token

### 3. Create Azure DevOps Project (2 minutes)

1. Go to [dev.azure.com](https://dev.azure.com)
2. Click **"+ New project"**
3. Name: `PortfolioLanding`, click **"Create"**
4. Push your code:
   ```bash
   cd c:\projects\PortfolioLanding
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://dev.azure.com/<your-org>/PortfolioLanding/_git/PortfolioLanding
   git push -u origin main
   ```

### 4. Add Deployment Token (1 minute)

1. In Azure DevOps, go to **Pipelines** -> **Library**
2. Click **"+ Variable group"**
3. Name: `portfolio-variables`
4. Add variable:
   - **Name**: `DEPLOYMENT_TOKEN`
   - **Value**: Paste deployment token
   - Click the **lock icon** to make it secret
5. Click **"Save"**

### 5. Create Pipeline (2 minutes)

1. Go to **Pipelines** -> **New pipeline**
2. Select **"Azure Repos Git"**
3. Select your repository
4. Select **"Existing Azure Pipelines YAML file"**
5. Path: `/azure-pipelines.yml`
6. Click **"Continue"** -> **"Run"**
7. Permit access to variable group when prompted

### 6. Configure Environment Variables (1 minute)

1. Go to Azure Portal -> Static Web App -> **Configuration**
2. Add:
   - `RECIPIENT_EMAIL`: Your email address
   - `SENDGRID_API_KEY`: (Optional - for email)
   - `SENDER_EMAIL`: (Optional - for email)

### 7. Get Your URL

- Azure Portal -> Static Web App -> **Overview**
- Your site: `https://<your-app-name>.azurestaticapps.net`

## Done!

Your portfolio is live with:
- Free hosting on Azure
- Free SSL certificate
- Automatic deployments via Azure DevOps
- Working contact form
- Custom domain support (optional)

## What Happens on Each Push

```
git push -> Azure DevOps Pipeline triggers
         -> Builds frontend + API
         -> Deploys to Azure Static Web Apps
         -> Site is updated automatically
```

## Need Help?

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions and troubleshooting.

---

**Total Cost: $0/month**
