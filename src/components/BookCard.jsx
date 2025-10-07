import { Link } from 'react-router-dom'
import { coverUrl } from '../services/books'
import '../styles/cards.css'

export default function BookCard({ workId, title, authorNames = [], coverId, year }) {
  return (
    <article className="card">
      <header className="card-header">
        <div className="card-header-text">
          <h3 className="card-title">{title}</h3>
          <p className="card-subtitle">{authorNames.join(', ') || 'Autor desconocido'}</p>
        </div>
      </header>

      <section className="card-body book-body">
        {coverId && (
          <img
            className="book-cover"
            src={coverUrl(coverId, 'M')}
            alt={title}
          />
        )}
        <div>
          {year && <p><strong>Año:</strong> {year}</p>}
        </div>
      </section>

      <div className="card-actions">
        <Link className="btn" to={`/libros/${workId}`}>Ver libro</Link>
      </div>
    </article>
  )
}
