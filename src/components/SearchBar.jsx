import { useState } from 'react'
import '../styles/search.css'

export default function SearchBar({
  initial = '',
  onSearch,
  placeholder = 'Buscar...'
}) {
  const [q, setQ] = useState(initial)

  function handleSubmit(e) {
    e.preventDefault()
    const term = q.trim()
    onSearch(term || 'a')
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
      />
      <button className="btn btn-search" type="submit">Buscar</button>
    </form>
  )
}
