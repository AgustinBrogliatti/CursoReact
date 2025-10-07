import { useState } from 'react'

export default function Card({ title, subtitle, body, more, footer, children }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <article className="card">
      <header className="card-header">
        <div className="card-header-text">
          <h3 className="card-title">{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>

        {typeof more !== 'undefined' && (
          <div className="card-actions">
            <button className="btn" onClick={() => setShowDetails(s => !s)}>
              {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
            </button>
          </div>
        )}
      </header>

      <section className="card-body">
        {body && <p>{body}</p>}
        {children}
      </section>

      {showDetails && more && (
        <section className="card-details">{more}</section>
      )}

      {footer && <footer className="card-footer">{footer}</footer>}
    </article>
  )
}
