export default function CardUsuario({ nombre, email }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
        <h3>Usuario: {nombre}</h3>
        <p>Email: {email}</p>
      </div>
    );
  }
  