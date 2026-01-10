# Houmph.com - Domain Sales Website

A Next.js conversion of the original domain sales website, now ready for deployment on Vercel.

## Features

- Responsive design with custom CSS grid layout
- GSAP animations for interactive elements
- Contact form with validation using React Hook Form
- Email notifications using Mailgun
- TypeScript support
- Optimized for Vercel deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env.local` file with the required variables. See `.env.example` for a template.
```bash
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_API_URL=https://api.mailgun.net
EMAIL_FROM=noreply@mg.yourdomain.com
EMAIL_RECIPIENTS=cafournier@me.com
```

3. Run the development server:
```bash
npm run dev
```

## Environment Variables

This project requires the following environment variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MAILGUN_API_KEY` | Yes | - | API key from Mailgun (get from Settings > API Keys) |
| `MAILGUN_DOMAIN` | Yes | - | Your Mailgun domain (e.g., mg.yourdomain.com) |
| `MAILGUN_API_URL` | No | https://api.mailgun.net | Mailgun API endpoint (use https://api.eu.mailgun.net for EU) |
| `EMAIL_FROM` | No | noreply@[MAILGUN_DOMAIN] | Sender email address (must use your Mailgun domain) |
| `EMAIL_RECIPIENTS` | No | cafournier@me.com | Recipient email address for form submissions |

See `.env.example` for a template.

## Deployment on Vercel

### Prerequisites
1. Have a Mailgun account at https://app.mailgun.com
2. Get your Mailgun API key from Settings > API Keys
3. Note your Mailgun domain (from Sending > Domains)
4. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

1. **Import to Vercel**:
   - Go to https://vercel.com
   - Click "Add New" > "Project"
   - Import your Git repository

2. **Configure Environment Variables**:
   In the deployment configuration, add:
   - `MAILGUN_API_KEY`: Your Mailgun API key
   - `MAILGUN_DOMAIN`: Your Mailgun domain (e.g., `mg.yourdomain.com`)
   - `MAILGUN_API_URL`: `https://api.mailgun.net` (or `https://api.eu.mailgun.net` for EU)
   - `EMAIL_FROM`: `noreply@mg.yourdomain.com` (use your Mailgun domain)
   - `EMAIL_RECIPIENTS`: `cafournier@me.com`

3. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be available at `https://your-project.vercel.app`

### Testing the Form

After deployment:
1. Open your deployed site
2. Click to open the contact form
3. Fill out all fields with test data
4. Submit the form
5. Verify you receive:
   - Notification email at the recipient address
   - Auto-response at the submitted email address
6. Check Mailgun dashboard for delivery status

### Troubleshooting

**"Email service is not configured"**:
- Ensure both `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` are set in Vercel Project Settings > Environment Variables
- Redeploy after adding environment variables

**Emails not arriving**:
- Verify your Mailgun domain is active (check Sending > Domains in Mailgun dashboard)
- Check Mailgun logs for delivery status (Sending > Logs)
- Verify sender email uses your Mailgun domain
- Check free tier limits (Flex Trial: 5,000 emails/month)

**500 Error**:
- Check Vercel function logs in Dashboard > Logs
- Verify API key and domain are correct
- If using EU region, ensure `MAILGUN_API_URL` is set to `https://api.eu.mailgun.net`
- Check Mailgun API status

## Original Features Preserved

- All domain categories and listings
- Custom fonts (Kairos Sans and Yorkshire Script)
- Original color scheme and styling
- Form validation and submission
- GSAP animations for domain hover effects
- Responsive design

## Technologies Used

- Next.js 15 with App Router
- TypeScript
- React Hook Form with Yup validation
- GSAP for animations
- Mailgun for email handling
- Custom CSS (converted from SCSS)