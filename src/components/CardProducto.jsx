import { useState } from "react";

export default function CardProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  return (
    <div className="card">
      <h3>Producto</h3>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <p><strong>state:</strong> {nombre} - ${precio}</p>
    </div>
  );
}
