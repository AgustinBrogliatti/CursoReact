import { useState } from 'react'

export default function Card({ title, subtitle, body, footer, children }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <article>
      <header>
        <hgroup>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </hgroup>
      </header>
      
      <div>
        {body}
        {children}
      </div>

      <footer>
        <button onClick={() => setShowDetails(s => !s)}>
          {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
        </button>
        {footer}
      </footer>
    </article>
  )
}