import '../styles/cards.css'

export default function AuthorCard({ name, topWork, workCount }) {
  return (
    <article className="card">
      <header className="card-header">
        <div className="card-header-text">
          <h3 className="card-title">{name}</h3>
          {topWork && <p className="card-subtitle">Obra destacada: {topWork}</p>}
        </div>
      </header>
      <section className="card-body">
        <p><strong>Cantidad de obras:</strong> {workCount ?? '—'}</p>
      </section>
    </article>
  )
}
