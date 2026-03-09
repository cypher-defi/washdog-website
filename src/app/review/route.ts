import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

const GOOGLE_REVIEW_URL = "https://g.page/r/Cdkeg2WpEyGwEAE/review"

export function GET(request: NextRequest) {
  // GA4 / GTM will fire on this page before the redirect,
  // capturing source= and any other params for offline conversion tracking.
  const source = request.nextUrl.searchParams.get("source") ?? "direct"
  void source // tracked via GA4 page_view on this URL before redirect
  redirect(GOOGLE_REVIEW_URL)
}
