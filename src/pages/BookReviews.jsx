import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchBookByWorkId, coverUrl } from '../services/books'
import '../styles/cards.css'
import '../styles/forms.css'

//utilizo el localStorage para guardar localmente en el navegador las reseñas
function loadReviews(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
function saveReviews(key, items) {
  localStorage.setItem(key, JSON.stringify(items))
}

export default function BookReviews() {
  const { workId } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const storageKey = `reviews:${workId}`
  const [reviews, setReviews] = useState(() => loadReviews(storageKey))

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

  useEffect(() => {
    saveReviews(storageKey, reviews)
  }, [storageKey, reviews])

  function handleAddReview(e) {
    e.preventDefault()
    const form = e.currentTarget
    const name = form.elements.name.value.trim()
    const comment = form.elements.comment.value.trim()
    if (!name || !comment) return
    const review = {
      id: Date.now(),
      name,
      comment,
      date: new Date().toISOString(),
    }
    setReviews(prev => [review, ...prev])
    form.reset()
  }

  function handleDeleteReview(id) {
    setReviews(prev => prev.filter(r => r.id !== id))
  }

  if (loading) return <section className="grid-container"><p className="card-subtitle">Cargando reseñas...</p></section>
  if (error) return <section className="grid-container"><p className="card-subtitle">No se pudo cargar el libro.</p></section>

  const cover = book?.covers?.[0] ? coverUrl(book.covers[0], 'M') : null

  return (
    <section className="grid-container review-container">
      <div className="page-actions">
        <Link className="btn review" to={`/libros/${workId}`}>← Volver al libro</Link>
        <Link className="btn review" to="/libros">Ver todos los libros</Link>
      </div>

      <h2 className="grid-title">Reseñas</h2>

      {book && (
        <div className="detail-grid">
          {cover && <img className="detail-cover" src={cover} alt={book.title} />}
          <div className="detail-info">
            <h3 className="detail-title">{book.title}</h3>
            {book.subjects?.length > 0 && (
              <div className="detail-tags">
                {book.subjects.slice(0, 8).map(s => (
                  <span key={s} className="detail-tag">{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <form className="form" onSubmit={handleAddReview}>
        <div className="form-row">
          <label className="label" >Nombre</label>
          <input name="name" className="input" placeholder="Tu nombre" />
        </div>
        <div className="form-row">
          <label className="label">Comentario</label>
          <textarea name="comment" className="textarea" rows={3} placeholder="¿Qué te pareció el libro?"></textarea>
        </div>
        <button type="submit" className="btn">Agregar reseña</button>
      </form>

      <div className="review-list">
        {reviews.length === 0 && <p className="card-subtitle">No hay reseñas todavía.</p>}
        {reviews.map(r => (
          <div key={r.id} className="review-item">
            <div className="review-meta">
              <span className="review-name">{r.name}</span>
              <span className="review-date">{new Date(r.date).toLocaleDateString()}</span>
            </div>
            <p className="review-text">{r.comment}</p>
            <button className="btn btn-danger" onClick={() => handleDeleteReview(r.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </section>
  )
}
