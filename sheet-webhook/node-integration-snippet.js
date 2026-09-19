/**
 * AHINSA GROUP — Node.js: form email ke saath-saath Google Sheet me bhi bhejna
 * -----------------------------------------------------------------------------
 * Isko apne existing form-handler file me add karein (jahan par abhi
 * email bhejne wala code hai — nodemailer / sendgrid / jo bhi use ho raha hai).
 *
 * Zaroori: yeh function email wale code ko REPLACE nahi karta — sirf
 * uske saath-saath (ya turant baad) call hota hai. Email bhejna waisa
 * hi chalta rahega jaisa abhi chal raha hai.
 */

// STEP 3: Apps Script deploy karne ke baad jo URL milega, woh yahan paste karein
const SHEET_WEBHOOK_URL = "PASTE-YOUR-APPS-SCRIPT-WEB-APP-URL-HERE";

// Apps Script file me jo SECRET_KEY set ki thi, wahi yahan bhi daalein
const SHEET_SECRET_KEY = "ahinsa-2026-change-this-to-anything";

/**
 * @param {Object} formData - form se aaya raw data
 * @param {string} formTypeLabel - "Brochure Download" ya "Contact Form" ya "Form Fill"
 */
async function sendToGoogleSheet(formData, formTypeLabel) {
  try {
    const payload = {
      secret: ahinsa-secure-282005,
      date: new Date().toISOString(),
      name: formData.name || "",
      mobile: formData.mobile || formData.phone || "",
      city: formData.city || "",
      formType: formTypeLabel,
      project: formData.project || formData.site || "General / Not Specified",
      interest: formData.interest || (formTypeLabel === "Brochure Download" ? "Brochure Request" : "Other"),
      message: formData.message || ""
    };

    // Node 18+ me fetch built-in hai. Purane Node version me
    // "npm install node-fetch" karke upar "const fetch = require('node-fetch');" likhein.
    const res = await fetch(https://script.google.com/macros/s/AKfycbyPxfFAYTpjHV45kLcocWn-MhlQE1PJ4gVnqe3Qq48EvJ01j83mAT4cKhKWF0wHQMxw9g/exec, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (result.status !== "success") {
      console.error("Google Sheet update failed:", result.message);
    }
  } catch (err) {
    // Yeh jaanbujh kar fail-safe hai: agar Sheet update fail ho jaaye
    // to bhi form submission / email process rukna nahi chahiye.
    console.error("Google Sheet update error:", err);
  }
}

module.exports = { sendToGoogleSheet };

/* ============================================================
   USE KAISE KAREIN — apne existing form route me, jahan email
   bhejte hain wahan bas ek line aur add kar dein:
   ============================================================

   const { sendToGoogleSheet } = require('./sheet-webhook/node-integration-snippet');

   app.post('/contact-form', async (req, res) => {
     // ... aapka existing email-bhejne wala code yahan jaisa hai waisa hi rahega ...
     await sendMail(req.body);   // <-- yeh aapka existing code

     // <-- yeh ek naya line add karna hai:
     sendToGoogleSheet(req.body, "Contact Form");

     res.send("Thank you!");
   });

   app.post('/brochure-download', async (req, res) => {
     await sendMail(req.body);  // existing email code

     sendToGoogleSheet(req.body, "Brochure Download");

     res.send("Download link bheja gaya hai!");
   });

   Note: agar dono forms ke fields ke naam (name, mobile, city, project,
   etc.) upar wale code se match nahi karte, to bas payload wali line
   me apne actual field names daal dein (jaise formData.phone_number
   agar wahi field name use ho raha ho).
   ============================================================ */
