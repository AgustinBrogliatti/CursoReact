import Navbar from "./Navbar";
import CardUsuario from "./CardUsuario";
import CardProducto from "./CardProducto";

export default function Layout() {
  return (
    <div className="container">
      <Navbar />
      <h1>TP1 - Proyecto Inicial</h1>
      <CardUsuario />
      <CardProducto />
    </div>
  );
}
