import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const contentDir = path.join(process.cwd(), "content/servicios")

export interface Commune {
  name: string
  slug: string
}

export interface RelatedService {
  href: string
  label: string
}

export interface ServicioMeta {
  slug: string
  title: string
  description: string
  keywords?: string
  communes?: Commune[]
  relatedServices?: RelatedService[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Servicio extends ServicioMeta {
  contentHtml: string
  faqs: FaqItem[]
}

/**
 * Extracts FAQ pairs from markdown content.
 * Looks for H3/H2 headings starting with ¿ and their following paragraph.
 */
export function extractFaqs(content: string): FaqItem[] {
  const faqs: FaqItem[] = []
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (/^#{2,3}\s+¿/.test(line)) {
      const question = line.replace(/^#{2,3}\s+/, '').trim()
      let answer = ''
      for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
        const next = lines[j].trim()
        if (next && !next.startsWith('#') && !next.startsWith('|')) {
          answer = next.replace(/[*_[\]()]/g, '').replace(/\[.*?\]\(.*?\)/g, '').trim()
          break
        }
      }
      if (question && answer) faqs.push({ question, answer })
    }
  }
  return faqs
}

export function getAllServicios(): ServicioMeta[] {
  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"))
  return files.map(filename => {
    const slug = filename.replace(".md", "")
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8")
    const { data } = matter(raw)
    return { slug, ...data } as ServicioMeta
  })
}

export async function getServicio(slug: string): Promise<Servicio | null> {
  const filepath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf-8")
  const { data, content } = matter(raw)
  const contentHtml = await marked(content)
  const faqs = extractFaqs(content)
  return { slug, contentHtml, faqs, ...data } as Servicio
}
