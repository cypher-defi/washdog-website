import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { EditorGate } from "./EditorGate"

export const metadata = { robots: "noindex, nofollow" }

export default async function EditorPage() {
  const cookieStore = await cookies()
  const auth = cookieStore.get("tools_auth")
  const correct = process.env.TOOLS_PASSWORD

  if (correct && auth?.value === correct) {
    redirect("/tools/editor-app.html")
  }

  return <EditorGate />
}
