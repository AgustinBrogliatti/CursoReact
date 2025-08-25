export default function CardUsuario({ nombre, email }) {
    return (
      <article>
        <header><strong>{nombre}</strong></header>
        <p>{email}</p>
      </article>
    );
  }
  