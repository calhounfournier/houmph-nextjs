# Quick Deployment Guide with Mailgun

## Prerequisites Checklist

Before deploying, make sure you have:

- [ ] Mailgun account at https://app.mailgun.com
- [ ] Mailgun API key and domain ready
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Vercel account at https://vercel.com

---

## Step 1: Get Your Mailgun Credentials

### You Already Have a Mailgun Account! ✓

1. **Login to Mailgun:**
   - Go to https://app.mailgun.com
   - Login with your credentials

2. **Get Your API Key:**
   - Go to Settings > API Keys (https://app.mailgun.com/app/account/security/api_keys)
   - Copy your **Private API key** (starts with a long string)
   - **Important:** Use the Private API key, not the Public key

3. **Get Your Domain:**
   - Go to Sending > Domains (https://app.mailgun.com/app/sending/domains)
   - You'll see your domain(s) listed
   - Copy the domain name (e.g., `mg.yourdomain.com` or `sandboxXXXX.mailgun.org`)

4. **Check Your Region:**
   - If your account is in **US**: Use `https://api.mailgun.net`
   - If your account is in **EU**: Use `https://api.eu.mailgun.net`
   - Not sure? Check the URL when logged into Mailgun dashboard

### Mailgun Account Types

**Sandbox Domain (Trial):**
- Free for testing
- Can send to authorized recipients only (you need to verify recipient emails)
- Domain looks like: `sandboxXXXXXXXX.mailgun.org`
- Good for: Testing before production

**Custom Domain:**
- Your own verified domain
- Can send to anyone
- Requires DNS configuration
- Good for: Production use

**Free Tier (Flex Trial):**
- 5,000 emails/month for first 3 months
- Perfect for this contact form

---

## Step 2: Deploy to Vercel

### Method A: Using Vercel Dashboard (Recommended)

1. **Push your code to Git:**
   ```bash
   git add .
   git commit -m "Configure Mailgun for email sending"
   git push
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com
   - Click "Add New" > "Project"
   - Import your repository
   - Select the repository

3. **Configure Settings:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Leave build settings as default

4. **Add Environment Variables:**
   Click "Environment Variables" and add these **5 variables**:

   | Name | Value | Example |
   |------|-------|---------|
   | `MAILGUN_API_KEY` | Your Mailgun private API key | `a1b2c3d4e5f6g7h8i9j0...` |
   | `MAILGUN_DOMAIN` | Your Mailgun domain | `mg.yourdomain.com` or `sandboxXXXX.mailgun.org` |
   | `MAILGUN_API_URL` | API endpoint based on region | `https://api.mailgun.net` (US) or `https://api.eu.mailgun.net` (EU) |
   | `EMAIL_FROM` | Sender email (must use Mailgun domain) | `noreply@mg.yourdomain.com` |
   | `EMAIL_RECIPIENTS` | Where to send form submissions | `cafournier@me.com` |

   **Important:**
   - Add them for **Production**, **Preview**, and **Development** (select all)
   - The `EMAIL_FROM` address **must** use your `MAILGUN_DOMAIN`
   - If using sandbox, you need to add `cafournier@me.com` as an authorized recipient in Mailgun

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your site will be live at `https://your-project.vercel.app`

---

### Method B: Using Vercel CLI

1. **Login to Vercel:**
   ```bash
   vercel login
   ```
   Follow the prompts to authenticate

2. **Deploy:**
   ```bash
   cd /workspace
   vercel
   ```

   When prompted:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **houmph-nextjs** (or your preferred name)
   - In which directory is your code? **./
   - Want to modify settings? **N**

3. **Add Environment Variables:**
   ```bash
   # Add MAILGUN_API_KEY
   vercel env add MAILGUN_API_KEY production
   # Paste your Mailgun private API key when prompted

   # Add MAILGUN_DOMAIN
   vercel env add MAILGUN_DOMAIN production
   # Enter your Mailgun domain (e.g., mg.yourdomain.com)

   # Add MAILGUN_API_URL
   vercel env add MAILGUN_API_URL production
   # Enter: https://api.mailgun.net (or https://api.eu.mailgun.net for EU)

   # Add EMAIL_FROM
   vercel env add EMAIL_FROM production
   # Enter: noreply@mg.yourdomain.com (use your Mailgun domain)

   # Add EMAIL_RECIPIENTS
   vercel env add EMAIL_RECIPIENTS production
   # Enter: cafournier@me.com
   ```

   Repeat for `preview` and `development` environments if needed

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

---

## Step 3: Configure Mailgun for Sandbox (If Using Sandbox Domain)

If you're using a Mailgun sandbox domain for testing, you need to authorize recipients:

1. Go to https://app.mailgun.com/app/sending/domains
2. Click on your sandbox domain
3. Scroll to "Authorized Recipients"
4. Click "Add Recipient"
5. Enter `cafournier@me.com`
6. Mailgun will send a confirmation email to that address
7. Check the inbox and click the verification link

**Important:** Sandbox domains can only send to authorized recipients!

---

## Step 4: Test Your Deployment

### Basic Testing

1. **Open your deployed site** (URL provided after deployment)

2. **Test the contact form:**
   - Click to open the contact form
   - Fill in:
     - Name: Test User
     - Email: your-test-email@example.com (must be authorized if using sandbox!)
     - Message: Testing the contact form with Mailgun
   - Click "SEND"
   - Should see "Submitting..." animation
   - Should see "Thank you!" message

3. **Verify emails arrived:**
   - Check `cafournier@me.com` inbox for notification email
   - Check your test email inbox for auto-response
   - Both should arrive within seconds

4. **Check Mailgun dashboard:**
   - Go to https://app.mailgun.com/app/sending/logs
   - Filter by last 24 hours
   - You should see 2 emails: one to recipient, one auto-response
   - Status should show "delivered" or "accepted"

5. **Check Vercel logs:**
   - Go to Vercel Dashboard > Your Project > Logs
   - Filter by `/api/contact`
   - Verify no error messages (should see 200 OK responses)

---

## Troubleshooting

### "Email service is not configured"
**Problem:** Missing `MAILGUN_API_KEY` or `MAILGUN_DOMAIN` in Vercel

**Solution:**
1. Go to Vercel Dashboard > Project > Settings > Environment Variables
2. Verify both `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` exist
3. Redeploy: Go to Deployments > Click "..." > Redeploy

---

### "Failed to send email" or Emails not arriving
**Problem:** Could be several issues

**Solutions to try:**

1. **Using Sandbox Domain?**
   - Make sure recipient email is authorized in Mailgun
   - Go to Mailgun > Domains > Your Sandbox > Authorized Recipients
   - Add and verify `cafournier@me.com`

2. **Wrong Region?**
   - Check if your Mailgun account is in EU or US
   - Update `MAILGUN_API_URL` in Vercel accordingly:
     - US: `https://api.mailgun.net`
     - EU: `https://api.eu.mailgun.net`

3. **Wrong API Key?**
   - Make sure you're using the **Private API key**, not Public
   - Get it from: Settings > API Keys > Private API key

4. **Sender Email Mismatch?**
   - `EMAIL_FROM` must use your `MAILGUN_DOMAIN`
   - Wrong: `noreply@gmail.com`
   - Right: `noreply@mg.yourdomain.com`

5. **Check Mailgun Logs:**
   - Go to https://app.mailgun.com/app/sending/logs
   - Look for failed or rejected messages
   - Check the error message for details

---

### 500 Internal Server Error
**Problem:** Server-side error

**Solution:**
1. Check Vercel function logs (Dashboard > Logs)
2. Look for specific error message
3. Common issues:
   - Invalid API key format
   - Wrong domain name
   - Region mismatch (US vs EU)
   - Network timeout
4. Verify all environment variables are set correctly
5. Try redeploying after fixing

---

### Sandbox Recipient Not Authorized
**Problem:** Using sandbox domain but recipient not verified

**Solution:**
1. Go to Mailgun dashboard
2. Sending > Domains > Click your sandbox domain
3. Scroll to "Authorized Recipients"
4. Add `cafournier@me.com`
5. Check email and verify
6. Try sending again

---

## Quick Reference

### Your Configuration

- **Recipient Email:** cafournier@me.com
- **Mailgun Account:** ✓ (You already have this!)
- **Environment Variables Needed:**
  - `MAILGUN_API_KEY` ✓ (required - from Mailgun Settings)
  - `MAILGUN_DOMAIN` ✓ (required - from Mailgun Domains)
  - `MAILGUN_API_URL` (optional - defaults to US)
  - `EMAIL_FROM` (optional - defaults to noreply@[MAILGUN_DOMAIN])
  - `EMAIL_RECIPIENTS` (optional - defaults to cafournier@me.com)

### Important URLs

- Mailgun Dashboard: https://app.mailgun.com
- Mailgun API Keys: https://app.mailgun.com/app/account/security/api_keys
- Mailgun Domains: https://app.mailgun.com/app/sending/domains
- Mailgun Logs: https://app.mailgun.com/app/sending/logs
- Vercel Dashboard: https://vercel.com/dashboard
- Your Site: (will be provided after deployment)

### Support

- Mailgun Docs: https://documentation.mailgun.com
- Mailgun API Reference: https://documentation.mailgun.com/en/latest/api_reference.html
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

## What's Already Done ✓

- ✅ Build configuration fixed
- ✅ Email functionality implemented with Mailgun
- ✅ Environment variables documented
- ✅ Error handling added
- ✅ Form validation configured
- ✅ Recipient email set to cafournier@me.com
- ✅ Build verified and working
- ✅ Mailgun SDK installed and configured
- ✅ Support for US and EU regions

## What You Need to Do

1. ✓ Get Mailgun API key (you already have account!)
2. ✓ Get Mailgun domain from your account
3. Push code to Git repository
4. Deploy to Vercel
5. Add environment variables
6. If using sandbox, authorize recipient email
7. Test the form!

---

**Ready to deploy! You already have Mailgun, so you're all set! 🚀**

## Next Steps

1. Login to Mailgun and grab your API key and domain
2. Follow Method A or Method B above to deploy
3. Test the form
4. Celebrate! 🎉
