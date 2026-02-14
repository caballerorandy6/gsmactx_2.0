# Automated Campaign Sending - Cron Job Setup (OPTIONAL)

> **⚠️ NOTE**: This cron job is **OPTIONAL** and currently **DISABLED** by default.
>
> The system works perfectly in **manual mode** where you click "Send Next Batch" whenever you want to send emails. Admin notifications work automatically in manual mode.
>
> Only enable this if you want fully automated sending without manual clicks.

## 🎯 Overview

This **optional** automated daily cron job can:
- ✅ Run every day at **8:00 AM Central Standard Time (CST)**
- ✅ Automatically send pending campaign emails (up to 100/day)
- ✅ Send completion notifications to all admins when campaigns finish
- ✅ Process multiple campaigns intelligently
- ✅ Work completely hands-free

## ⏰ Schedule

- **Time**: 8:00 AM CST (1:00 PM UTC)
- **Frequency**: Daily
- **Cron Expression**: `0 13 * * *`

## 🔐 Required Environment Variables

Add this to your `.env` file:

```env
# Cron Job Security
CRON_SECRET=your_secret_key_here_make_it_long_and_random
```

**How to generate a secure CRON_SECRET:**

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://www.uuidgenerator.net/
```

## 🚀 Deployment to Vercel

### 1. Add Environment Variable

In your Vercel dashboard:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add `CRON_SECRET` with the value you generated
4. Make sure it's available for **Production**, **Preview**, and **Development**

### 2. Deploy

The cron job is already configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/send-campaigns",
      "schedule": "0 13 * * *"
    }
  ]
}
```

Once you deploy to Vercel, the cron job will automatically run daily.

### 3. Verify in Vercel

After deployment:
1. Go to your Vercel dashboard
2. Click on your project
3. Go to **Settings** → **Cron Jobs**
4. You should see: `/api/cron/send-campaigns` scheduled for `0 13 * * *`

## 📊 How It Works

### Automatic Process Flow:

1. **Every day at 8 AM CST**, the cron job runs
2. **Checks daily quota**: How many emails can be sent today?
3. **Finds active campaigns**: Gets all campaigns with pending emails
4. **Sends emails**: Sends up to 100 emails across all campaigns
5. **Updates status**: Marks each email as "sent" or "failed"
6. **Checks completion**: If a campaign is complete, marks it as done
7. **Notifies admins**: Sends beautiful email notification to all admins

### Example Scenario:

**Day 1 (8 AM CST):**
- Campaign A: 150 pending emails → Sends 100
- Status: 100 sent, 50 pending

**Day 2 (8 AM CST):**
- Campaign A: 50 pending emails → Sends 50
- Campaign B: 200 pending emails → Sends 50 (using remaining quota)
- Status A: 150 sent, 0 pending ✅ **COMPLETE** → Admin notified
- Status B: 50 sent, 150 pending

**Day 3 (8 AM CST):**
- Campaign B: 150 pending emails → Sends 100
- Status B: 150 sent, 50 pending

**Day 4 (8 AM CST):**
- Campaign B: 50 pending emails → Sends 50
- Status B: 200 sent, 0 pending ✅ **COMPLETE** → Admin notified

## 📧 Admin Notification Email

When a campaign completes, all admins receive a beautiful email with:

```
✅ Campaign Completed!

Hello [Admin Name],

Great news! Your email campaign has been successfully completed.

Campaign Details:
- Campaign: [Campaign Title]
- Total Emails Sent: [Number]
- Completed: [Date and Time]
```

## 🔍 Monitoring

### Check Cron Logs in Vercel:

1. Go to your Vercel dashboard
2. Click on your project
3. Go to **Deployments** → Select latest deployment
4. Click on **Functions** tab
5. Find `/api/cron/send-campaigns`
6. View logs to see execution history

### Console Logs:

The cron job logs helpful information:

```
🚀 Starting automated campaign sending...
📊 Remaining quota: 100/100
📧 Found 2 campaign(s) with pending emails
📤 Processing campaign "Summer Sale": 100 emails
✅ Campaign "Summer Sale" completed!
✅ Cron job completed: 100 sent, 0 failed, 1 campaign(s) completed
✅ Completion notification sent to 3 admin(s)
```

## 🧪 Testing the Cron Job Locally

You can test the cron job manually:

### Option 1: Using curl

```bash
curl http://localhost:3003/api/cron/send-campaigns \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Option 2: Using Postman/Insomnia

- **Method**: GET
- **URL**: `http://localhost:3003/api/cron/send-campaigns`
- **Headers**:
  - `Authorization: Bearer YOUR_CRON_SECRET`

### Expected Response:

```json
{
  "success": true,
  "emailsSent": 50,
  "emailsFailed": 0,
  "campaignsCompleted": 1,
  "completedCampaigns": ["Summer Sale"]
}
```

## 🛡️ Security Features

- ✅ **Authorization Required**: Endpoint requires `CRON_SECRET` in header
- ✅ **Vercel-Only**: Only Vercel cron jobs can access (when deployed)
- ✅ **Rate Limiting**: Respects daily quota automatically
- ✅ **Error Handling**: Failed emails are logged, not lost

## 🎛️ Configuration

### Change Send Time:

Edit `vercel.json` to change the schedule:

```json
{
  "crons": [
    {
      "path": "/api/cron/send-campaigns",
      "schedule": "0 13 * * *"  // Change this
    }
  ]
}
```

**Cron Schedule Examples:**

- `0 13 * * *` - 8:00 AM CST (1:00 PM UTC)
- `0 14 * * *` - 9:00 AM CST (2:00 PM UTC)
- `0 12 * * *` - 7:00 AM CST (12:00 PM UTC)
- `0 13 * * 1-5` - 8:00 AM CST, Monday-Friday only

**Cron Expression Format:**

```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of week (0-6, 0=Sunday)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

### Change Daily Limit:

Edit `/src/app/api/cron/send-campaigns/route.ts`:

```typescript
const DAILY_LIMIT = 100; // Change this to your plan limit
```

## 📋 Manual vs. Automatic Sending

You have **two options** for sending campaigns:

### Option 1: Manual (Original)
- Go to campaign detail page
- Click "Send Next Batch" manually
- Good for: Testing, one-time sends, manual control

### Option 2: Automatic (New)
- Set it and forget it
- Runs daily at 8 AM CST
- Good for: Large campaigns, hands-off operation

**Both options use the same system**, so you can mix and match!

## ⚠️ Important Notes

1. **Daily Limit is Shared**: Manual + Automatic sends share the 100/day quota
2. **Timezone**: All times are in UTC on Vercel, converted to CST for users
3. **Completion Check**: Campaign is only marked complete when ALL emails are sent
4. **Admin Emails**: Make sure admin emails in database are valid to receive notifications

## 🔧 Troubleshooting

### Cron not running?

1. **Check CRON_SECRET**: Make sure it's set in Vercel environment variables
2. **Check logs**: View function logs in Vercel dashboard
3. **Verify schedule**: Ensure cron schedule is correct in `vercel.json`
4. **Redeploy**: Sometimes you need to redeploy after adding cron jobs

### Not receiving admin notifications?

1. **Check admin emails**: Verify emails in database are correct
2. **Check Resend logs**: Login to Resend dashboard to see email delivery
3. **Check spam folder**: Notifications might be in spam
4. **Verify FROM_EMAIL**: Make sure it's a verified domain in Resend

### Emails sending at wrong time?

1. **Remember UTC**: Vercel uses UTC time
2. **CST = UTC-6**: So 8 AM CST = 2 PM UTC (Standard Time)
3. **CDT = UTC-5**: During Daylight Saving Time, 8 AM CDT = 1 PM UTC
4. **Adjust schedule**: Change cron expression to match your timezone

## 📚 Related Files

- `/vercel.json` - Cron job configuration
- `/src/app/api/cron/send-campaigns/route.ts` - Cron job logic
- `/src/app/actions/sendCampaignEmailAction.ts` - Campaign sending actions
- `/CAMPAIGN_SYSTEM.md` - Full campaign system documentation

## 🎉 Benefits

✅ **Hands-free operation**: Set up once, runs forever
✅ **Automatic notifications**: Admins know when campaigns complete
✅ **Smart processing**: Handles multiple campaigns intelligently
✅ **Quota management**: Never exceeds daily limits
✅ **Error recovery**: Failed emails are tracked and can be retried
✅ **Flexible**: Can still send manually if needed

## 🚀 Next Steps

1. Generate a `CRON_SECRET`
2. Add it to your Vercel environment variables
3. Deploy to Vercel
4. Verify cron job appears in dashboard
5. Wait for 8 AM CST tomorrow (or test manually)
6. Check your admin email for completion notifications! 🎉
