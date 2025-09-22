# Houmph.com - Domain Sales Website

A Next.js conversion of the original domain sales website, now ready for deployment on Vercel.

## Features

- Responsive design with custom CSS grid layout
- GSAP animations for interactive elements
- Contact form with validation using React Hook Form
- Email notifications using Nodemailer
- TypeScript support
- Optimized for Vercel deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env.local` file with the following variables:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=forms@houmph.com
EMAIL_RECIPIENTS=alaindesmeules@mac.com
```

3. Run the development server:
```bash
npm run dev
```

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel dashboard
4. Deploy!

## Original Features Preserved

- All domain categories and listings
- Custom fonts (Kairos Sans and Yorkshire Script)
- Original color scheme and styling
- Form validation and submission
- GSAP animations for domain hover effects
- Responsive design

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- React Hook Form with Yup validation
- GSAP for animations
- Nodemailer for email handling
- Custom CSS (converted from SCSS)