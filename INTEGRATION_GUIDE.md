# Campaign Email System - Integration Guide

## ✅ Integration Complete!

The batch email campaign system has been successfully integrated into your admin dashboard.

## 🔗 Where to Find It

1. **Navigate to**: Admin Dashboard → View Campaigns
2. **Click on**: "View campaign" button on any campaign
3. **You'll see**:
   - Campaign Management section with the batch sender controls
   - Email Preview section below

## 📊 Campaign Detail Page

The campaign detail page (`/view-campaigns/[id]`) now includes:

### 1. Campaign Sender Component
- **Initialize Campaign**: Prepares the email list for all active subscribers
- **Send Next Batch**: Sends up to 100 emails (respecting daily quota)
- **Retry Failed**: Retries any failed emails from previous batches
- **Statistics Dashboard**:
  - Total subscribers
  - Emails sent ✓
  - Emails failed ✗
  - Emails pending ⏳
- **Progress Bar**: Visual representation of campaign completion
- **Daily Quota Tracker**: Shows remaining emails for today

### 2. Email Preview
- Live preview of how the email will look to recipients
- Same preview functionality as before

## 🚀 How to Use

### First Time Setup (for each campaign):

1. Go to "View Campaigns" in admin dashboard
2. Click "View campaign" on a campaign you want to send
3. Click **"Initialize Campaign"** button
   - This creates email logs for all active subscribers
   - You only need to do this ONCE per campaign
4. Once initialized, you'll see the statistics dashboard

### Sending Emails:

1. Click **"Send Next Batch"** to send up to 100 emails
2. The system will:
   - Check your daily quota (100 emails max per day)
   - Send as many emails as possible within the quota
   - Update the statistics in real-time
3. If you have more than 100 subscribers:
   - Come back tomorrow and click "Send Next Batch" again
   - Repeat until all emails are sent

### Handling Failures:

1. If any emails fail, you'll see a **"Retry X Failed"** button
2. Click it to reset failed emails to "pending"
3. Click "Send Next Batch" again to retry sending them

## 🗄️ Database Schema

The system uses the existing `CampaignEmailLog` model:

```prisma
model CampaignEmailLog {
  id           String      @id @default(uuid())
  campaignId   String
  campaign     Campaign    @relation(fields: [campaignId], references: [id], onDelete: Cascade)

  subscriberId String
  subscriber   Subscriber  @relation(fields: [subscriberId], references: [id], onDelete: Cascade)

  status       String      @default("pending") // pending, sent, failed
  error        String?
  sentAt       DateTime?
  createdAt    DateTime    @default(now())

  @@index([campaignId, status])
  @@index([subscriberId])
}
```

## 🔧 Technical Details

### Files Modified:
- `/src/app/(admin)/view-campaigns/[id]/page.tsx` - Added CampaignSender component

### Files Created:
- `/src/components/admin-components/CampaignSender.tsx` - Main UI component
- `/src/app/actions/sendCampaignEmailAction.ts` - Server actions for batch sending
- `/CAMPAIGN_SYSTEM.md` - Detailed system documentation

### Server Actions Available:
```typescript
// Initialize campaign for all subscribers
initializeCampaignEmailLogsAction(campaignId: string)

// Send batch of emails
sendCampaignBatchAction(campaignId: string)

// Get campaign statistics
getCampaignStatsAction(campaignId: string)

// Retry failed emails
retryFailedEmailsAction(campaignId: string)
```

## ⚙️ Configuration

The daily limit is set in `/src/app/actions/sendCampaignEmailAction.ts`:

```typescript
const DAILY_LIMIT = 100; // Resend free tier limit
```

To increase this limit:
1. Upgrade your Resend plan
2. Change the `DAILY_LIMIT` constant to match your plan

### Resend Plans:
- **Free**: 100 emails/day
- **Pro**: $20/month → 50,000 emails/month
- **Business**: $250/month → 1M emails/month

## 🔐 Security Features

- ✅ Authentication required (admin only)
- ✅ Server-side validation
- ✅ Rate limiting enforcement
- ✅ Unsubscribe links in all emails
- ✅ Cascade deletion (emails deleted when campaign/subscriber deleted)

## 📝 Next Steps

1. **Test the system**:
   - Create a test campaign
   - Initialize it
   - Send a test batch
   - Verify emails are sent correctly

2. **Monitor daily quota**:
   - Keep track of the daily quota tracker
   - Plan multi-day campaigns accordingly

3. **Review failed emails**:
   - Check error messages in failed emails
   - Update invalid subscriber emails if needed

## 🤖 NEW: Automatic Daily Sending

The system now includes **automatic daily sending** via Vercel Cron Jobs!

### Features:
- ✅ Runs every day at **8:00 AM CST** automatically
- ✅ Sends up to 100 emails per day across all campaigns
- ✅ **Sends completion notifications to admins** when campaigns finish
- ✅ No manual intervention needed

### Setup:
1. See `/CRON_SETUP.md` for complete setup instructions
2. Add `CRON_SECRET` to your environment variables
3. Deploy to Vercel
4. Done! Campaigns send automatically

### Duplicate Prevention:
**Don't worry about duplicates!** Each email has a unique status in the database:
- When initialized: All emails marked as `"pending"`
- When sent: Changed to `"sent"`
- Next day: Only `"pending"` emails are sent

The system **cannot** send the same email twice because it only processes emails with `status: "pending"`.

## 📖 Full Documentation

For complete details, troubleshooting, and examples, see:
- `/CAMPAIGN_SYSTEM.md` - Complete system documentation
- `/CRON_SETUP.md` - Automatic sending setup guide
- `/INTEGRATION_GUIDE.md` - This file

## 🎉 Ready to Go!

The system is fully integrated and ready to use. Choose your preferred method:
- **Manual**: Navigate to any campaign and click "Send Next Batch"
- **Automatic**: Set up the cron job and let it run daily at 8 AM CST
