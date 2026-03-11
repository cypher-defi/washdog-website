import { test, expect } from '@playwright/test'
import path from 'path'

const FILE_URL = `file://${path.resolve('public/tools/editor-app.html')}`

// All 20 template combinations
const CATEGORIES = ['tip', 'park', 'client', 'service'] as const
const STYLES = [1, 2, 3, 4, 5]

// Expected dimensions (display = 50% of export)
const CANVAS_W = 540
const CANVAS_H = 720     // 3:4 ratio: 1080×1440 at export
const SAFE_INSET = 54    // 56px at export (54px display ≈ 108px export — actually 54 * 2 = 108, but safe zone is 56px at full res)

test.describe('Instagram template editor — canvas & safe zone', () => {

  test('canvas is 540×720px (3:4, exports at 1080×1440)', async ({ page }) => {
    await page.goto(FILE_URL)
    const box = await page.locator('.post').boundingBox()
    expect(box!.width).toBe(CANVAS_W)
    expect(box!.height).toBe(CANVAS_H)
  })

  test('safe zone border is inset 54px from all canvas edges', async ({ page }) => {
    await page.goto(FILE_URL)
    const canvasBox = await page.locator('.post').boundingBox()
    const borderBox = await page.locator('#safe-zone-border').boundingBox()

    expect(borderBox!.x - canvasBox!.x).toBeCloseTo(SAFE_INSET, 0)
    expect(borderBox!.y - canvasBox!.y).toBeCloseTo(SAFE_INSET, 0)
    expect((canvasBox!.x + canvasBox!.width) - (borderBox!.x + borderBox!.width)).toBeCloseTo(SAFE_INSET, 0)
    expect((canvasBox!.y + canvasBox!.height) - (borderBox!.y + borderBox!.height)).toBeCloseTo(SAFE_INSET, 0)
  })

  test('safe zone overlay is visible by default', async ({ page }) => {
    await page.goto(FILE_URL)
    const safeZone = page.locator('#safe-zone')
    await expect(safeZone).toBeVisible()
    await expect(safeZone).not.toHaveClass(/hidden/)
  })

  test('safe zone toggle hides and shows overlay', async ({ page }) => {
    await page.goto(FILE_URL)
    const btn = page.locator('#zone-btn')
    const safeZone = page.locator('#safe-zone')

    // Initially visible
    await expect(safeZone).not.toHaveClass(/hidden/)

    // Click to hide
    await btn.click()
    await expect(safeZone).toHaveClass(/hidden/)

    // Click to show again
    await btn.click()
    await expect(safeZone).not.toHaveClass(/hidden/)
  })

  test('export button shows correct format label', async ({ page }) => {
    await page.goto(FILE_URL)
    await expect(page.locator('.export-btn')).toContainText('1080×1440')
  })

})

test.describe('All 20 templates — content stays within safe zone', () => {

  for (const cat of CATEGORIES) {
    for (const style of STYLES) {
      test(`${cat}-${style}: no content element overflows the safe zone`, async ({ page }) => {
        await page.goto(FILE_URL)

        // Select category
        await page.evaluate((c) => {
          const btn = [...document.querySelectorAll('.cat-btn')]
            .find(el => el.textContent?.toLowerCase().includes(
              c === 'tip' ? 'tip' : c === 'park' ? 'parque' : c === 'client' ? 'cliente' : 'servicio'
            ))
          ;(btn as HTMLElement)?.click()
        }, cat)

        // Select style
        await page.evaluate((s) => {
          const btns = document.querySelectorAll('.style-btn')
          ;(btns[s - 1] as HTMLElement)?.click()
        }, style)

        await page.waitForTimeout(100)

        const canvasBox = await page.locator('.post').boundingBox()
        const safeTop    = canvasBox!.y + SAFE_INSET
        const safeLeft   = canvasBox!.x + SAFE_INSET
        const safeBottom = canvasBox!.y + canvasBox!.height - SAFE_INSET
        const safeRight  = canvasBox!.x + canvasBox!.width - SAFE_INSET

        // Check only leaf content elements (text, badges, icons) — not layout containers
        const overflowing = await page.evaluate(
          ({ safeTop, safeLeft, safeBottom, safeRight }) => {
            const post = document.querySelector('.post')!
            // Target actual content, not layout wrappers or decorative oversized glyphs
            const candidates = post.querySelectorAll(
              'h2, h3, p, span, img, ' +
              '.badge-yd, .badge-bl, .badge-wh, .badge-dk, ' +
              '.save-pill, .stars, .quote, .dog-name, .dog-meta, ' +
              '.meta, .eyebrow, ' +
              '.num, .txt, .chip, .loc-badge, .n'
            )
            // Exclude purely decorative oversized glyphs (.big-num, .quote-mark)
            // that intentionally extend beyond content but are clipped by overflow:hidden
            const violations: string[] = []

            for (const el of candidates) {
              const r = el.getBoundingClientRect()
              // Skip invisible or zero-size elements
              if (r.width === 0 || r.height === 0) continue
              const label = `${el.tagName}.${[...el.classList].join('.')}`
              if (r.top < safeTop - 1)       violations.push(`${label} top=${r.top.toFixed(1)} < ${safeTop.toFixed(1)}`)
              if (r.left < safeLeft - 1)     violations.push(`${label} left=${r.left.toFixed(1)} < ${safeLeft.toFixed(1)}`)
              if (r.bottom > safeBottom + 1) violations.push(`${label} bottom=${r.bottom.toFixed(1)} > ${safeBottom.toFixed(1)}`)
              if (r.right > safeRight + 1)   violations.push(`${label} right=${r.right.toFixed(1)} > ${safeRight.toFixed(1)}`)
            }
            return violations
          },
          { safeTop, safeLeft, safeBottom, safeRight }
        )

        expect(overflowing, `${cat}-${style} violations:\n${overflowing.join('\n')}`).toHaveLength(0)
      })
    }
  }

})
