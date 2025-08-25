export default function CardProducto({ nombre, precio }) {
    return (
      <article>
        <header><strong>{nombre}</strong></header>
        <p>Precio: ${precio}</p>
      </article>
    );
  }
  