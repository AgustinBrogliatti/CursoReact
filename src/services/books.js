const BASE = 'https://openlibrary.org'

export async function searchBooks(q = 'harrypotter', page = 1) {
  const url = `${BASE}/search.json?q=${encodeURIComponent(q)}&page=${page}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error buscando libros')
  const json = await res.json()

  // Normalizamos algunos campos
  return json.docs.map(d => ({
    workId: (d.key || '').replace('/works/', ''), //recortamos la respuesta, ya que viene como /works/id
    title: d.title,
    authorNames: d.author_name || [],
    coverId: d.cover_i,
    year: d.first_publish_year,
  }))
}

export function coverUrl(coverId, size = 'M') {
  if (!coverId) return null
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

export async function fetchBookByWorkId(workId) {
  const res = await fetch(`${BASE}/works/${workId}.json`)
  if (!res.ok) throw new Error('No se pudo cargar el libro')
  const data = await res.json()
  return {
    title: data.title,
    description:
      typeof data.description === 'string'
        ? data.description
        : data.description?.value,
    subjects: data.subjects || [],
    covers: data.covers || [], // array de coverId
  }
}

export async function searchAuthors(q = 'a', page = 1, { signal } = {}) {
  const url = `${BASE}/search/authors.json?q=${encodeURIComponent(q || 'a')}&page=${page}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error('Error buscando autores')
  const json = await res.json()
  return json.docs.map(a => ({
    id: a.key?.replace('/authors/', ''),
    name: a.name,
    topWork: a.top_work,
    workCount: a.work_count,
  }))
}