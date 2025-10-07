import { Link } from 'react-router-dom'
import '../styles/home.css'

export default function Home() {
  return (
    <section className="home">
      <h1 className="home-title">Catálogo de Libros</h1>
      <p className="home-subtitle">
        Explora títulos, descubre autores y mira el detalle de cada obra.
      </p>
      <div className="home-actions">
        <Link className="btn" to="/libros">Ver libros</Link>
        <Link className="btn" to="/autores">Ver autores</Link>
      </div>
    </section>
  )
}
