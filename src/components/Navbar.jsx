import { Link } from 'react-router-dom'
import '../App.css'

export default function Navbar() {
  return (
    <nav className="navbar">
    <Link to="/" className="navbar-logo"><strong>BookHub</strong></Link>
    <div className="navbar-links">
      <Link to="/">Inicio</Link>
      <Link to="/libros">Libros</Link>
      <Link to="/autores">Autores</Link>
    </div>
  </nav>
  )
}