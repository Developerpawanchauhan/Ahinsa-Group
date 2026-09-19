import { SHEET_WEBHOOK_URL, SHEET_SECRET_KEY } from '../data/site'

/**
 * Writes one form submission as a row in the Google Sheet.
 *
 * This site is a static build — there is no Node server, no route handler and
 * no `req.body` — so the call goes straight from the visitor's browser to the
 * Apps Script Web App. Two consequences shape the code below:
 *
 * - `Content-Type: text/plain` avoids a CORS preflight, which Apps Script does
 *   not answer. The body is still JSON and `doPost(e)` still reads it from
 *   `e.postData.contents`.
 * - `mode: 'no-cors'` means the reply comes back opaque, so there is nothing
 *   to check. That is fine: this is a copy of the lead, and the email remains
 *   the record that has to arrive.
 *
 * Deliberately not `async` and never awaited by its callers. The sheet must
 * never be able to slow a form down, block a PDF download, or hold up the chat
 * assistant's reply — every caller fires it and moves on.
 *
 * @param {Object} formData       the form's own fields, whatever they are named
 * @param {string} formTypeLabel  which form this came from, for the sheet
 */
export function sendToGoogleSheet(formData, formTypeLabel) {
  if (!SHEET_WEBHOOK_URL) return

  const payload = {
    secret: SHEET_SECRET_KEY,
    date: new Date().toISOString(),
    name: formData.name || '',
    mobile: formData.mobile || formData.phone || '',
    email: formData.email || '',
    city: formData.city || '',
    formType: formTypeLabel,
    project: formData.project || formData.site || 'General / Not Specified',
    interest:
      formData.interest || (formTypeLabel === 'Brochure Download' ? 'Brochure Request' : 'Other'),
    message: formData.message || '',
    page: typeof window === 'undefined' ? '' : window.location.pathname,
  }

  try {
    fetch(SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      // Lets the request finish even if the visitor navigates away or the
      // brochure download starts right after.
      keepalive: true,
    }).catch((err) => console.warn('Google Sheet update failed:', err))
  } catch (err) {
    console.warn('Google Sheet update failed:', err)
  }
}
