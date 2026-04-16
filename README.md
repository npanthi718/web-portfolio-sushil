# Sushil Panthi Portfolio

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Demo-0ea5e9)](https://www.sushilpanthi.com)
[![Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF)](https://vitejs.dev)

A modern, responsive portfolio website built with React and Vite to showcase projects, experience, research, and contact workflows.

## Highlights

- Production-ready responsive layout for desktop, tablet, and mobile.
- Polished sections for About, Skills, Projects, Experience, Education, Courses, Achievements, and Research.
- Contact workflow with EmailJS dual delivery:
  - Admin notification email
  - Visitor confirmation email
- Guided inquiry selection in contact form for faster and better replies.
- Reusable, modular UI with CSS Modules and motion-enhanced interactions.
- SEO and social metadata configured in the root HTML.

## Tech Stack

- React 19
- Vite 6
- Framer Motion
- MUI Icons
- React Icons
- EmailJS
- Vitest + Testing Library

## Live Site

- https://www.sushilpanthi.com

## Project Structure

- src
  - components
  - contexts
  - data
  - pages
  - styles
- email-templates
  - admin-notification-template.html
  - visitor-confirmation-template.html
  - README.md
- scripts
- public

## Local Setup

1. Clone repository

   git clone https://github.com/npanthi718/web-portfolio-sushil.git
   cd web-portfolio-sushil

2. Install dependencies

   npm install

3. Create environment file

   Copy .env.example to .env and fill values:

   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx

4. Run in development

   npm run dev

5. Build for production

   npm run build

6. Preview production build

   npm run preview

## Scripts

- npm run dev: start development server
- npm run build: create production build
- npm run preview: preview built app
- npm run test: run tests once
- npm run test:watch: run tests in watch mode
- npm run optimize:images: optimize profile source images

## EmailJS Setup (Quick)

Use templates from email-templates folder.

- Admin template file: email-templates/admin-notification-template.html
- Visitor template file: email-templates/visitor-confirmation-template.html

Required variables:

- from_name
- email
- from_email
- reply_to
- inquiry_type
- message
- submitted_at
- portfolio_url
- response_time

Recommended mapping:

- VITE_EMAILJS_TEMPLATE_ID -> visitor confirmation template
- VITE_EMAILJS_ADMIN_TEMPLATE_ID -> admin notification template

## Assets Notes

Profile image selection supports AVIF, WEBP, JPG, JPEG, PNG via import glob fallback.

Resume download is auto-detected from src/assets for:

- .pdf
- .doc
- .docx

## Security and Environment

- .env files are ignored by git.
- .env.example stays committed for safe sharing.
- Do not commit real EmailJS credentials.

## Contact

- Email: npanthi718@gmail.com
- LinkedIn: https://www.linkedin.com/in/sushilpanthi/
- GitHub: https://github.com/npanthi718

## License

MIT
