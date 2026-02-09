# Portfolio Landing Page

A modern, responsive landing page that serves as a one-stop shop for showcasing professional experience, projects, resume, and technical experiments.

## Features

- **Hero Section**: Eye-catching introduction with links to GitHub, LinkedIn, and Blog
- **Projects Section**: Showcase your notable work with descriptions and technology tags
- **Resume Section**: Links to both PDF download and web version of your resume
- **Labs Section**: Highlight technical experiments (AKS, Terraform, ML Pipelines)
- **Contact Form**: Functional contact form with serverless backend (low-cost options)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Modern UI with smooth scrolling and fade-in effects
- **Backend Options**: Multiple serverless function implementations (Azure, Netlify, Vercel)

## Getting Started

### Prerequisites

No build tools or dependencies required! This is a pure HTML/CSS/JavaScript project that can run directly in any modern web browser.

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process needed.

### Customization

#### 1. Update Personal Information

Edit `index.html` and replace the following placeholders:

- **Name**: Replace "Your Name" in the hero section (line ~30)
- **Title**: Update "Software Engineer | Cloud Architect | ML Enthusiast" to match your role
- **Social Links**: Update the URLs for:
  - GitHub: `https://github.com/yourusername`
  - LinkedIn: `https://linkedin.com/in/yourusername`
  - Blog: `https://yourblog.com`
- **Email**: Update `your.email@example.com` in the contact section

#### 2. Add Your Projects

In the Projects section, update each project card with:
- Project name
- Description
- Technology tags
- Link to the project (GitHub, live demo, etc.)

#### 3. Add Resume Files

- **PDF Resume**: Place your resume PDF file in the root directory and name it `resume.pdf`, or update the link in the resume section
- **Web Resume**: Update the URL to point to your existing resume website

#### 4. Customize Labs/Experiments

Update the Labs section with your actual experiments:
- AKS experiments
- Terraform infrastructure projects
- ML pipeline projects
- Add links to repositories or documentation

#### 5. Styling Customization

Edit `styles.css` to customize:
- Colors: Modify CSS variables in the `:root` selector
- Fonts: Change the Google Fonts import in `index.html`
- Spacing and layout: Adjust padding, margins, and grid layouts

#### 6. Color Scheme

The default color scheme uses:
- Primary: Indigo (`#6366f1`)
- Secondary: Purple (`#8b5cf6`)
- Accent: Amber (`#fbbf24`)

To change colors, modify the CSS variables at the top of `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

## File Structure

```
PortfolioLanding/
│
├── index.html                 # Main HTML file
├── styles.css                 # All styling and responsive design
├── script.js                  # JavaScript for interactivity
├── staticwebapp.config.json   # Azure Static Web Apps configuration
├── azure-pipelines.yml        # Azure DevOps CI/CD pipeline
├── resume.pdf                 # Your resume PDF
├── api/                       # Azure Functions (deployed with Static Web Apps)
│   ├── contact/
│   │   └── index.js           # Contact form API handler
│   └── package.json
├── backend/                   # Standalone backend options (reference)
│   ├── azure/
│   ├── netlify/
│   ├── vercel/
│   └── README.md
├── DEPLOYMENT.md              # Full Azure DevOps deployment guide
├── QUICK_START.md             # Quick start guide
└── README.md                  # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Azure Static Web Apps + Azure DevOps (Recommended)

**Free tier includes:** 100GB bandwidth/month, custom domains, SSL, Azure Functions, Azure DevOps CI/CD

See **[QUICK_START.md](QUICK_START.md)** for a fast setup or **[DEPLOYMENT.md](DEPLOYMENT.md)** for full instructions.

**How it works:**
1. Create Azure Static Web App in Azure Portal (source: **Other**)
2. Push code to Azure Repos
3. Azure DevOps pipeline builds and deploys automatically
4. Contact form API is deployed as an integrated Azure Function

**Cost: $0/month** for typical portfolio usage!

## Backend

The contact form backend is built into the `api/` directory and deploys automatically with Azure Static Web Apps. No separate backend deployment needed.

- `api/contact/index.js` — handles form submissions
- Sends email via SendGrid (free tier: 100 emails/day)
- Falls back to Azure logs if SendGrid is not configured

Standalone backend implementations for other platforms are in `backend/` for reference.

## Tips

- **Performance**: The page uses CDN links for fonts and icons. For better performance, consider hosting these locally.
- **SEO**: Add meta tags in the `<head>` section for better search engine optimization
- **Analytics**: Add Google Analytics or similar tracking code if desired
- **Custom Domain**: Configure a custom domain through your hosting provider
- **Backend**: See `backend/README.md` for backend setup and cost optimization tips

## License

Feel free to use this template for your own portfolio!

## Support

If you have questions or need help customizing, feel free to reach out or open an issue.

---

Built with ❤️ using HTML, CSS, and JavaScript
