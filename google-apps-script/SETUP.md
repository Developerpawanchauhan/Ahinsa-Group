# Brochure Download — OTP Setup

When someone fills the brochure download form and verifies their phone, their
details (brochure, name, city, phone) are **emailed to info@ahinsagroup.in**
via Web3Forms — the same service as the site's contact forms. That part
already works; nothing to set up.

The only thing that needs a backend is **sending the OTP by SMS** (a static
website cannot send SMS by itself). Google Apps Script provides this for
free. Takes ~5 minutes.

Until this is set up, the popup runs in **demo mode**: the OTP is shown on
screen instead of arriving by SMS (the email to info@ahinsagroup.in still
sends normally after verification).

## 1. Create the Apps Script

1. Go to https://script.google.com → **New project**.
2. Delete the default code and paste in the full contents of
   [`brochure-otp.gs`](./brochure-otp.gs).
3. Save (Ctrl+S) and name the project, e.g. "Ahinsa Brochure OTP".

## 2. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Type: **Web app**.
3. *Execute as:* **Me** · *Who has access:* **Anyone**.
4. Click **Deploy**, authorize the permissions, and copy the Web App URL
   (ends in `/exec`).

## 3. Connect the website

Open `src/data/site.js` and paste the URL:

```js
export const BROCHURE_LEADS_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec'
```

## 4. Enable real SMS OTP (Fast2SMS)

1. Sign up at https://www.fast2sms.com (Indian numbers; OTP route).
2. Get your API key from the **Dev API** section.
3. In the Apps Script, set:
   ```js
   var FAST2SMS_KEY = 'your-key-here'
   ```
4. **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**
   (required — edits don't go live until you redeploy).

Now the OTP arrives on the visitor's phone and is never shown on screen.

> Any other SMS gateway (MSG91, Twilio, etc.) works the same way — just
> replace the `UrlFetchApp.fetch` call in `sendOtp()` with that provider's API.
