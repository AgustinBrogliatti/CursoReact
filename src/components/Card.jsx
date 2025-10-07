import { useState } from 'react'

export default function Card({ title, subtitle, body, footer, children }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">{title}</div>
          {subtitle && <div className='card-subtitle'>{subtitle}</div>}
        </div>
      </div>
      
      <div>
        <p>{body}</p>
        <p>{children}</p>
      </div>

      <div>
        <button onClick={() => setShowDetails(s => !s)}>
          {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
        </button>
        {footer}
      </div>
    </div>
  )
}