import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/" className="contrast"><strong>TP II React</strong></Link></li>
      </ul>
      <ul>
        <li><NavLink to="/" end>Inicio</NavLink></li>
        <li><NavLink to="/usuarios">Usuarios</NavLink></li>
        <li><NavLink to="/productos">Productos</NavLink></li>
      </ul>
    </nav>
  )
}