export default function CardProducto({ nombre, precio }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
        <h3>Producto: {nombre}</h3>
        <p>Precio: ${precio}</p>
      </div>
    );
  }
  