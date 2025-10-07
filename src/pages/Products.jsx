import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'
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
        <section className='grid-container'>
            <h2 className='grid-title'>Productos</h2>
            <div className="cards-grid">
                {products.map(p => (
                    <Card
                        key={p.id}
                        title={p.title}
                        subtitle={`$ ${p.price}`}
                        more={p.description}
                        body={<>
                            <img src={p.image} alt={p.title} className="prod-img" />
                            <p className="category">{p.category}</p>
                        </>}
                    >
                    </Card>
                ))}
            </div>
        </section>
    )
}