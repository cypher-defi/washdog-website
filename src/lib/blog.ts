import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const contentDir = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: string
  author?: string
}

export interface HowToStep {
  name: string
  text: string
}

export interface Post extends PostMeta {
  contentHtml: string
  howToSteps: HowToStep[] | null
}

/**
 * Extracts HowTo steps from "Cómo" articles.
 * Matches H2/H3 headings with "Paso N" or numbered patterns.
 * Returns null if not a how-to article or fewer than 2 steps found.
 */
export function extractHowToSteps(content: string, title: string): HowToStep[] | null {
  const lc = title.toLowerCase()
  if (!lc.includes('cómo') && !lc.includes('como')) return null

  const steps: HowToStep[] = []
  const lines = content.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (/^#{2,3}\s+(paso\s+\d+|\d+\.\s+\w)/i.test(line)) {
      const name = line.replace(/^#{2,3}\s+/, '').replace(/:$/, '').trim()
      let text = ''
      for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
        const next = lines[j].trim()
        if (next && !next.startsWith('#')) {
          text += (text ? ' ' : '') + next.replace(/[*_[\]()]/g, '').replace(/\[.*?\]\(.*?\)/g, '').trim()
        } else if (next.startsWith('#')) break
      }
      if (name) steps.push({ name, text: text || name })
    }
  }

  return steps.length >= 2 ? steps : null
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"))
  return files
    .map(filename => {
      const slug = filename.replace(".md", "")
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8")
      const { data } = matter(raw)
      return { slug, ...data } as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<Post | null> {
  const filepath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf-8")
  const { data, content } = matter(raw)
  const contentHtml = await marked(content)
  const howToSteps = extractHowToSteps(content, (data.title as string) ?? slug)
  return { slug, contentHtml, howToSteps, ...data } as Post
}
