import { useState } from "react";

export default function CardUsuario() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="card">
      <h3>Usuario</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p><strong>state:</strong> {nombre} - {email}</p>
    </div>
  );
}
