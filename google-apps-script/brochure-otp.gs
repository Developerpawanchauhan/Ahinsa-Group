/**
 * Ahinsa Group — Brochure download OTP backend (Google Apps Script Web App)
 *
 * Handles two actions posted by the website's brochure download popup:
 *   send_otp   → generates a 6-digit OTP, stores it for 5 minutes,
 *                sends it by SMS via Fast2SMS (if a key is configured)
 *   verify_otp → checks the OTP and reports success/failure
 *
 * NOTE: lead details (brochure, name, city, phone) are NOT handled here —
 * the website emails them to info@ahinsagroup.in via Web3Forms after the
 * OTP is verified. This script only does SMS OTP.
 *
 * SETUP: see SETUP.md in this folder.
 */

// ── CONFIG ────────────────────────────────────────────────────────────────
// Fast2SMS (https://www.fast2sms.com) API key for real SMS delivery.
// Leave '' while testing — the OTP is then returned to the site and
// shown on screen instead of being sent by SMS.
var FAST2SMS_KEY = ''

var OTP_TTL_SECONDS = 300 // OTP validity: 5 minutes
// ──────────────────────────────────────────────────────────────────────────

function doPost(e) {
  var out
  try {
    var data = JSON.parse(e.postData.contents)
    if (data.action === 'send_otp') out = sendOtp(data)
    else if (data.action === 'verify_otp') out = verifyOtp(data)
    else out = { ok: false, error: 'Unknown action' }
  } catch (err) {
    out = { ok: false, error: 'Bad request' }
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function sendOtp(data) {
  var phone = String(data.phone || '').replace(/\D/g, '').slice(-10)
  if (!/^[6-9]\d{9}$/.test(phone)) return { ok: false, error: 'Invalid phone number' }

  var otp = String(Math.floor(100000 + Math.random() * 900000))
  CacheService.getScriptCache().put('otp_' + phone, otp, OTP_TTL_SECONDS)

  if (FAST2SMS_KEY) {
    var res = UrlFetchApp.fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'post',
      headers: { authorization: FAST2SMS_KEY },
      payload: { route: 'otp', variables_values: otp, numbers: phone },
      muteHttpExceptions: true,
    })
    if (res.getResponseCode() !== 200) {
      return { ok: false, error: 'Could not send SMS — please try again.' }
    }
    return { ok: true }
  }

  // No SMS provider configured — return the OTP so the site can display it
  // (test mode). Remove this once FAST2SMS_KEY is set.
  return { ok: true, testOtp: otp }
}

function verifyOtp(data) {
  var phone = String(data.phone || '').replace(/\D/g, '').slice(-10)
  var cache = CacheService.getScriptCache()
  var expected = cache.get('otp_' + phone)

  if (!expected || expected !== String(data.otp || '')) {
    return { ok: false, error: 'Incorrect or expired OTP — please try again.' }
  }
  cache.remove('otp_' + phone)
  return { ok: true }
}
