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
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await searchAuthors(query || 'a', 1)
        if (mounted) setAuthors(data.slice(0, 24))
      } catch (e) {
        if (mounted) setError(e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [query])

  return (
    <section className="grid-container">
      <h2 className="grid-title">Autores</h2>

      <SearchBar
        initial={query}
        onSearch={(q) => setQuery(q || 'a')}
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
