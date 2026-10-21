import { useEffect } from 'react'
import { fullTitle, metaTags, pageUrl } from '../data/seo'

/** Sets the content of a <meta> tag in <head>, adding the tag if it is missing. */
function setMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * Gives the current page its own title, description, share-preview tags,
 * canonical URL and — when it has some — structured data. `meta` is an entry
 * from src/data/seo.js: { path, title, description, image?, type?, robots?, jsonLd? }.
 * " | AHINSA GROUP" is added to the title there, so every page ends with it.
 * Pass null to leave the head alone (e.g. while redirecting).
 */
export function usePageMeta(meta) {
  useEffect(() => {
    if (!meta) return

    document.title = fullTitle(meta)
    for (const [attr, key, content] of metaTags(meta)) setMeta(attr, key, content)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = pageUrl(meta)

    // A page built into its own HTML file arrives with this script already in
    // place, so it is reused rather than added twice — and taken out again
    // when the visitor moves on, so the next page doesn't inherit it.
    let jsonLd = document.getElementById('page-jsonld')
    if (!meta.jsonLd) {
      jsonLd?.remove()
      return
    }
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.type = 'application/ld+json'
      jsonLd.id = 'page-jsonld'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify(meta.jsonLd)
    return () => jsonLd.remove()
    // The fields, not the object: a project page builds a new one each render.
  }, [meta?.path, meta?.title, meta?.description, meta?.image, meta?.type, meta?.robots, meta?.jsonLd])
}

export default usePageMeta
