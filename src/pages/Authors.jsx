import { useEffect, useState } from 'react'
import { searchAuthors } from '../services/books'
import AuthorCard from '../components/AuthorCard'
import SearchBar from '../components/SearchBar'
import '../styles/cards.css'
import '../styles/search.css'

export default function Authors() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('Saer')

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await searchAuthors(query || '', 1, { signal: ac.signal })
        setAuthors(data.slice(0, 24)) //filtramos
      } catch (e) {
        if (!ac.signal.aborted) setError(e)
      } finally {
        if (!ac.signal.aborted) setLoading(false)
      }
    })()
    return () => ac.abort()
  }, [query])

  return (
    <section className="grid-container">
      <h2 className="grid-title">Autores</h2>

      <SearchBar
        initial={query}
        onSearch={(q) => setQuery(q || 'a')} //funcion como prop
        placeholder="Buscar autores (p. ej., Borges)"
      />

      {loading && <p className="loader-text">Cargando autores...</p>}
      {error && <p className="card-subtitle">No se pudieron cargar los autores.</p>}
      {!loading && !error && authors.length === 0 && (
        <p className="card-subtitle">No hay autores para mostrar.</p>
      )}

      <div className="cards-grid">
        {authors.map(a => <AuthorCard key={a.id} {...a} />)}
      </div>
    </section>
  )
}
