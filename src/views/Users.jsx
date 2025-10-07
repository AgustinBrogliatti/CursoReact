import { useEffect, useState } from 'react'
import { fetchUsers } from '../api'
import Card from '../components/Card'


export default function Users() {
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)


useEffect(() => {
let cancelled = false
async function load() {
try {
setLoading(true)
const data = await fetchUsers()
if (!cancelled) setUsers(data)
} catch (err) {
if (!cancelled) setError(err)
} finally {
if (!cancelled) setLoading(false)
}
}
load()
return () => { cancelled = true }
}, [])


if (loading) return <p>Cargando usuarios...</p>
if (error) return <p>Ocurrió un error al cargar usuarios.</p>
if (users.length === 0) return <p>No hay usuarios para mostrar.</p>


return (
<section>
<h2>Usuarios</h2>
<div className="grid">
{users.map(u => (
<Card key={u.id}
title={u.name}
subtitle={u.email}
body={<>
<p><strong>Empresa:</strong> {u.company?.name}</p>
<p><strong>Ciudad:</strong> {u.address?.city}</p>
</>}
/>
))}
</div>
</section>
)
}