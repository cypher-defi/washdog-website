// One-time script to generate a refresh token with business.manage scope.
// Run: node scripts/get-gbp-token.mjs
// Then follow the printed instructions.

import { createServer } from 'http'
import { URL } from 'url'

const CLIENT_ID     = process.env.GBP_OAUTH_CLIENT_ID     || process.env.GOOGLE_OAUTH_CLIENT_ID
const CLIENT_SECRET = process.env.GBP_OAUTH_CLIENT_SECRET || process.env.GOOGLE_OAUTH_CLIENT_SECRET
const REDIRECT_URI  = 'http://localhost:3334'
const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
]

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
authUrl.searchParams.set('client_id', CLIENT_ID)
authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('scope', SCOPES.join(' '))
authUrl.searchParams.set('access_type', 'offline')
authUrl.searchParams.set('prompt', 'consent')

console.log('\n── GBP Refresh Token Generator ─────────────────────────')
console.log('\n1. Open this URL in your browser:\n')
console.log(authUrl.toString())
console.log('\n2. Authorize with the Google account that owns the GBP.')
console.log('   The page will redirect to localhost — waiting...\n')

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3333')
  const code = url.searchParams.get('code')

  if (!code) {
    res.end('No code found. Please try again.')
    return
  }

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenRes.json()

    if (tokens.error) {
      res.end(`Error: ${tokens.error_description}`)
      console.error('\nError:', tokens)
      server.close()
      return
    }

    res.end('<h2>✅ Done! Check your terminal for the refresh token.</h2><p>You can close this tab.</p>')

    console.log('\n── Success! Add this to Vercel (washdog-website) ──────────')
    console.log('\nGBP_OAUTH_CLIENT_ID=', CLIENT_ID)
    console.log('GBP_OAUTH_CLIENT_SECRET=', CLIENT_SECRET)
    console.log('GBP_REFRESH_TOKEN=', tokens.refresh_token)
    console.log('\n────────────────────────────────────────────────────────\n')

    server.close()
  } catch (err) {
    res.end('Error exchanging code.')
    console.error(err)
    server.close()
  }
})

server.listen(3334)
