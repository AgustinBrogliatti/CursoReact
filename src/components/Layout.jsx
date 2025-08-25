import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        {children}
      </div>
    </div>
  );
}
