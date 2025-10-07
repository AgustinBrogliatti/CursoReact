import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
        <strong>TP II React</strong>
        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/productos">Productos</Link>
        </div>
    </nav>
  )
}