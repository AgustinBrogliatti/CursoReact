import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'
import Authors from './pages/Authors'
import BookReviews from './pages/BookReviews' 

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/libros" element={<Books />} />
        <Route path="/libros/:workId" element={<BookDetail />} />
        <Route path="/libros/:workId/resenas" element={<BookReviews />} />
        <Route path="/autores" element={<Authors />} />
      </Routes>
    </div>
  )
}
