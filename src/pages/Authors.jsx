import { useEffect, useState } from 'react'
import { searchAuthors } from '../services/books'
import AuthorCard from '../components/AuthorCard'
import '../styles/cards.css'

export default function Authors() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ac = new AbortController()
      ; (async () => {
        try {
          setLoading(true)
          const data = await searchAuthors('Dario', 1)
          setAuthors(data.slice(0, 20))
        } catch (e) {
          if (!ac.signal.aborted) setError(e)
        } finally {
          if (!ac.signal.aborted) setLoading(false)
        }
      })()
    return () => ac.abort()
  }, [])

  if (loading) {
    return (
      <section className="grid-container">
        <p className="loader-text">Cargando autores...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="grid-container">
        <p className="card-subtitle">No se pudieron cargar los autores.</p>
      </section>
    )
  }

  if (authors.length === 0) {
    return (
      <section className="grid-container">
        <p className="card-subtitle">No hay autores para mostrar.</p>
      </section>
    )
  }

  return (
    <section className="grid-container">
      <h2 className="grid-title">Autores</h2>
      <div className="cards-grid">
        {authors.map(a => (
          <AuthorCard key={a.id} {...a} />
        ))}
      </div>
    </section>
  )
}
