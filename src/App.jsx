import Layout from "./components/Layout";
import CardUsuario from "./components/CardUsuario";
import CardProducto from "./components/CardProducto";

function App() {
  return (
    <Layout>
      <h1>TP1 - Configuración Inicial</h1>
      <CardUsuario nombre="Agustín" email="agus@mail.com" />
      <CardProducto nombre="Notebook" precio={1200} />
    </Layout>
  );
}

export default App;
