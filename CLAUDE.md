# CLAUDE.md

## Project Overview

Portfolio landing page — a static HTML/CSS/JS site deployed to Azure Static Web Apps via Azure DevOps Pipelines.

## Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript (no framework or build tools)
- **Backend**: Azure Functions (Node.js) in `api/` directory for contact form
- **Hosting**: Azure Static Web Apps (free tier)
- **CI/CD**: Azure DevOps Pipelines (`azure-pipelines.yml`)
- **Email**: SendGrid (optional, for contact form)

## Project Structure

- `index.html` — Main page (hero, projects, resume, labs, contact sections)
- `styles.css` — All styling, responsive design, CSS variables for theming
- `script.js` — Interactivity (smooth scroll, animations, form handling, hamburger menu)
- `staticwebapp.config.json` — Azure Static Web Apps routing config
- `azure-pipelines.yml` — CI/CD pipeline definition
- `api/` — Azure Functions deployed with Static Web Apps
- `api/contact/index.js` — Contact form API handler
- `backend/` — Reference implementations for other hosting platforms (Netlify, Vercel)

## Development

No build step required. Open `index.html` in a browser to preview.

## Design Tokens

CSS variables are defined in `:root` in `styles.css`:
- Primary: `--primary-color: #6366f1` (Indigo)
- Secondary: `--secondary-color: #8b5cf6` (Purple)
- Accent: `--accent-color: #fbbf24` (Amber)

## Conventions

- No package manager or bundler for the frontend — keep it dependency-free
- Font: Inter (loaded from Google Fonts CDN)
- Icons: Font Awesome 6.4 (loaded from cdnjs CDN)
- API dependencies managed via `api/package.json`
