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

  if (loading) return <p style={{ padding: 24 }}>Cargando libro...</p>
  if (error) return <p style={{ padding: 24 }}>No se pudo cargar el libro.</p>
  if (!book) return null

  const cover = book.covers?.[0] ? coverUrl(book.covers[0], 'L') : null

  return (
    <section style={{ padding: 24 }}>
      <Link className="btn" to="/libros" style={{ marginBottom: 16, display: 'inline-block' }}>
        ← Volver
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16 }}>
        {cover && (
          <img
            src={cover}
            alt={book.title}
            style={{ width: 240, height: 360, objectFit: 'cover', borderRadius: 8 }}
          />
        )}
        <div>
          <h1 style={{ marginTop: 0 }}>{book.title}</h1>
          {book.description && <p style={{ lineHeight: 1.5 }}>{book.description}</p>}
          {book.subjects?.length > 0 && (
            <>
              <h3>Temas</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {book.subjects.slice(0, 12).map(s => (
                  <span key={s} style={{
                    background: '#eef',
                    padding: '4px 8px',
                    borderRadius: 8,
                    fontSize: '.9rem'
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Link className="btn review" to={`/libros/${workId}/resenas`}>Ver reseñas</Link>
    </section>
  )
}
