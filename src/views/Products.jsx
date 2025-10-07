import { useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import Card from '../components/Card'


export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                const data = await fetchProducts()
                if (!cancelled) setProducts(data)
            } catch (err) {
                if (!cancelled) setError(err)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => { cancelled = true }
    }, [])


    if (loading) return <p>Cargando productos...</p>
    if (error) return <p>Ocurrió un error al cargar productos.</p>
    if (products.length === 0) return <p>No hay productos para mostrar.</p>


    return (
        <section>
            <h2>Productos</h2>
            <div className="grid">
                {products.map(p => (
                    <Card
                        key={p.id}
                        title={p.title}
                        subtitle={`$ ${p.price}`}
                        body={<>
                            <img src={p.image} alt={p.title} className="thumb" />
                            <p className="muted">{p.category}</p>
                        </>}
                    >
                        <p>{p.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    )
}