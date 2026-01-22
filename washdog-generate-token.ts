import { google } from "googleapis"
import http from "http"

const REDIRECT_URI = "http://localhost:3000/oauth2callback"

if (
  !process.env.GOOGLE_OAUTH_CLIENT_ID ||
  !process.env.GOOGLE_OAUTH_CLIENT_SECRET
) {
  throw new Error(
    "Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET in env"
  )
}

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  REDIRECT_URI
)

const SCOPES = ["https://www.googleapis.com/auth/calendar"]

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent"
})

console.log("\n🔐 Open this URL in your browser:\n")
console.log(authUrl, "\n")

http
  .createServer(async (req, res) => {
    if (!req.url?.startsWith("/oauth2callback")) return

    const url = new URL(req.url, REDIRECT_URI)
    const code = url.searchParams.get("code")

    if (!code) {
      res.end("❌ No authorization code received.")
      return
    }

    const { tokens } = await oAuth2Client.getToken(code)

    console.log("\n✅ GOOGLE REFRESH TOKEN:\n")
    console.log(tokens.refresh_token)

    res.end("✅ Authorization successful. You can close this tab.")
    process.exit(0)
  })
  .listen(3000, () => {
    console.log("🚀 Listening on http://localhost:3000")
  })
