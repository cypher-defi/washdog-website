import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const contentDir = path.join(process.cwd(), "content/newsletter")

export interface IssueMeta {
  slug:         string
  issue_number: number
  title:        string
  description:  string
  date:         string
  commune:      string
  subject_line: string
}

export interface Issue extends IssueMeta {
  contentHtml: string
}

export function getAllIssues(): IssueMeta[] {
  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"))
  return files
    .map(filename => {
      const slug = filename.replace(".md", "")
      const raw  = fs.readFileSync(path.join(contentDir, filename), "utf-8")
      const { data } = matter(raw)
      return { slug, ...data } as IssueMeta
    })
    .sort((a, b) => b.issue_number - a.issue_number)
}

export async function getIssue(slug: string): Promise<Issue | null> {
  const filepath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw  = fs.readFileSync(filepath, "utf-8")
  const { data, content } = matter(raw)
  const contentHtml = await marked(content)
  return { slug, contentHtml, ...data } as Issue
}
