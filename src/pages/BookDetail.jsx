import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchBookByWorkId, coverUrl } from '../services/books'
import '../styles/cards.css'

export default function BookDetail() {
  const { workId } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchBookByWorkId(workId)
        setBook(data)
      } catch (e) {
        if (!ac.signal.aborted) setError(e)
      } finally {
        if (!ac.signal.aborted) setLoading(false)
      }
    })()
    return () => ac.abort()
  }, [workId])

  if (loading) return <section className="grid-container"><p className="card-subtitle">Cargando libro...</p></section>
  if (error) return <section className="grid-container"><p className="card-subtitle">No se pudo cargar el libro.</p></section>
  if (!book) return null

  const cover = book.covers?.[0] ? coverUrl(book.covers[0], 'L') : null

  return (
    <section className="grid-container">
      <div className="page-actions">
        <Link className="btn" to="/libros">← Volver</Link>
        <Link className="btn" to={`/libros/${workId}/resenas`}>Ver reseñas</Link>
      </div>

      <div className="detail-grid">
        {cover && <img className="detail-cover" src={cover} alt={book.title} />}
        <div className="detail-info">
          <h1 className="detail-title">{book.title}</h1>

          {book.description && (
            <p className="detail-desc">{book.description}</p>
          )}

          {book.subjects?.length > 0 && (
            <>
              <h3 className="detail-subtitle">Temas</h3>
              <div className="detail-tags">
                {book.subjects.slice(0, 12).map(s => (
                  <span key={s} className="detail-tag">{s}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
