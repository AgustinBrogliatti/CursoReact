import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Users from './views/Users'
import Products from './views/Products'

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/productos" element={<Products />} />
        </Routes>
      </main>
    </div>
  )
}