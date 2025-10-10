# Batch Email Campaign System

## 📧 Overview

This system allows you to send email campaigns to your subscribers while respecting Resend's **100 emails per day limit** (free plan).

## 🎯 Features

- ✅ **Batch sending**: Send up to 100 emails per day automatically
- ✅ **Complete tracking**: Track every email (sent, failed, pending)
- ✅ **Retry failed emails**: Easily resend failed emails
- ✅ **Visual progress**: See your campaign status in real-time
- ✅ **Daily quota**: Monitor how many emails you have left per day
- ✅ **Multi-day campaigns**: Large campaigns complete over multiple days

## 🚀 How to Use

### 1. Create a Campaign

1. Go to "Create Campaign" in the dashboard
2. Fill out the form:
   - Campaign title
   - Email subject
   - Content
   - Image (optional)
3. Save the campaign

### 2. Initialize Campaign

1. Go to "View Campaigns"
2. Find your campaign
3. Click **"Initialize Campaign"**
   - This prepares the email list for all active subscribers
   - You only need to do this ONCE per campaign

### 3. Send Batches

Once initialized, you can send emails in batches:

1. Click **"Send Next Batch"**
2. The system will send up to 100 emails (or whatever remains in your daily quota)
3. You'll see updated progress:
   - Total emails
   - Emails sent (✓)
   - Emails failed (✗)
   - Emails pending (⏳)

### 4. Continue Next Day

If you have more than 100 subscribers:

1. **Today**: Send first 100 emails
2. **Tomorrow**: Come back and click "Send Next Batch" again
3. Repeat until campaign is complete

## 📊 Statistics Dashboard

The component displays:

### Stats Cards
- **Total**: Total number of subscribers
- **Sent** (green): Successfully sent emails
- **Failed** (red): Failed emails
- **Pending** (yellow): Emails to be sent

### Progress Bar
- Shows campaign completion percentage
- Updates automatically after each batch

### Daily Quota
- **Emails sent today**: How many you've sent in the last 24h
- **Remaining**: How many you can send today
- Color-coded bar:
  - 🟢 Green: More than 20 available
  - 🟡 Yellow: Between 1-20 available
  - 🔴 Red: 0 available (limit reached)

## 🔄 Error Handling

### If an email fails:

1. You'll see the number of failed emails in red
2. A **"Retry X Failed"** button will appear
3. Click to retry only the failed emails
4. Failed emails will return to "pending" status
5. Send the batch again

### Common failure causes:
- Invalid subscriber email
- Recipient's email server unavailable
- Temporary rate limiting

## 🛠️ Dashboard Integration

To use the `CampaignSender` component in your page:

```tsx
import CampaignSender from "@/components/admin-components/CampaignSender";

// In your campaign page
<CampaignSender
  campaignId={campaign.id}
  campaignTitle={campaign.title}
/>
```

## 📋 Complete Flow Example

### Scenario: 250 subscribers

**Day 1:**
1. Create the campaign
2. Click "Initialize Campaign" → 250 pending emails
3. Click "Send Next Batch" → Sends 100 emails
4. Status: 100 sent, 150 pending

**Day 2:**
1. Return to dashboard
2. Click "Send Next Batch" → Sends 100 emails
3. Status: 200 sent, 50 pending

**Day 3:**
1. Click "Send Next Batch" → Sends 50 emails
2. Status: 250 sent, 0 pending ✓
3. Campaign completed!

## 🗄️ Database

### `CampaignEmailLog` Model

Each record tracks an individual email:

```prisma
model CampaignEmailLog {
  id           String      @id @default(uuid())
  campaignId   String
  subscriberId String
  status       String      @default("pending") // pending, sent, failed
  error        String?
  sentAt       DateTime?
  createdAt    DateTime    @default(now())
}
```

### Possible statuses:
- **pending**: Email to be sent
- **sent**: Email sent successfully
- **failed**: Email failed (with error message)

## 🔐 Security

- ✅ Authentication required for all actions
- ✅ Only admins can send campaigns
- ✅ Automatic rate limiting (100/day)
- ✅ Server-side data validation
- ✅ Unsubscribe links included in all emails

## ⚙️ Environment Variables

Make sure you have these variables in your `.env`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
DATABASE_URL=postgresql://...
```

## 📈 Scalability

### Resend Free Plan:
- **100 emails/day**
- Ideal for: 0-3,000 subscribers/month

### If you need more:
1. **Resend Pro**: $20/month → 50,000 emails/month
2. **Resend Business**: $250/month → 1M emails/month

To upgrade, change `DAILY_LIMIT` in:
```typescript
// src/app/actions/sendCampaignEmailAction.ts
const DAILY_LIMIT = 100; // Change this according to your plan
```

## 🐛 Troubleshooting

### "Daily limit reached"
- **Solution**: Wait until tomorrow or upgrade your Resend plan

### "No active subscribers found"
- **Solution**: Make sure you have subscribers with `isSubscribed: true`

### "Campaign has already been initialized"
- **Solution**: Campaign is ready, just click "Send Next Batch"

### Emails remain "pending" without sending
- **Solution**: Click "Send Next Batch" manually each day, or enable automatic sending

## 🚀 Automatic Daily Sending (NEW!)

### ✨ Now Available: Automated Cron Job

The system now includes **automatic daily sending** that:

✅ Runs every day at **8:00 AM Central Standard Time (CST)**
✅ Automatically sends pending emails (up to 100/day)
✅ Processes multiple campaigns intelligently
✅ **Sends completion notifications to all admins** when campaigns finish

### How It Works:

1. **Every day at 8 AM CST**, the system automatically:
   - Checks how many emails can be sent today (respects 100/day limit)
   - Finds all campaigns with pending emails
   - Sends emails in batches until quota is reached
   - Marks completed campaigns as "sent"
   - **Sends beautiful email notifications to admins** when campaigns complete

2. **Admin Notifications**: When a campaign finishes, all admins receive:
   - Campaign title
   - Total emails sent
   - Completion date and time
   - Beautiful branded email template

### Setup:

**See `/CRON_SETUP.md` for complete setup instructions.**

Quick setup:
1. Add `CRON_SECRET` to your `.env` (generate with `openssl rand -base64 32`)
2. Add `CRON_SECRET` to Vercel environment variables
3. Deploy to Vercel
4. Done! Campaigns will send automatically at 8 AM CST

### Manual vs. Automatic:

You can choose:
- **Manual**: Click "Send Next Batch" when you want
- **Automatic**: Set it and forget it (8 AM CST daily)
- **Both**: Mix manual and automatic (they share the same quota)

## 📞 Support

If you need help:
1. Check error logs in the dashboard
2. Verify that `RESEND_API_KEY` is valid
3. Confirm you have active subscribers
