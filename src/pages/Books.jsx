import { useEffect, useState } from 'react'
import { searchBooks } from '../services/books'
import BookCard from '../components/BookCard'
import '../styles/cards.css'

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        const data = await searchBooks('harry potter', 1)
        setBooks(data)
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
        <p className="loader-text">Cargando libros...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="grid-container">
        <p className="card-subtitle">Ocurrió un error al cargar libros.</p>
      </section>
    )
  }

  if (books.length === 0) {
    return (
      <section className="grid-container">
        <p className="card-subtitle">No hay libros para mostrar.</p>
      </section>
    )
  }

  return (
    <section style={{ padding: 24 }}>
      <h2 className="section-title">Libros</h2>
      <div className="cards-grid">
        {books.map(b => (
          <BookCard key={b.workId} {...b} />
        ))}
      </div>
    </section>
  )
}
