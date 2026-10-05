export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      background: "#f5f7fa"
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}>
        <h1 style={{ textAlign: "center" }}>OrderNa</h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          Order easily and quickly
        </p>

        <h2>Choose a Service</h2>

        <div style={{ display: "grid", gap: "12px" }}>
          <button>Basic — ₦2,000</button>
          <button>Standard — ₦5,000</button>
          <button>Premium — ₦10,000</button>
          <button>Custom / Large Order</button>
        </div>
      </div>
    </main>
  );
 }
