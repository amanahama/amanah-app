import { useState } from "react";

export default function Home() {
  const [selectedService, setSelectedService] = useState("");

  const services = [
    { name: "Basic", price: "₦2,000" },
    { name: "Standard", price: "₦5,000" },
    { name: "Premium", price: "₦10,000" },
    { name: "Custom / Large Order", price: "Contact us for price" }
  ];

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
          {services.map((service) => (
            <button
              key={service.name}
              onClick={() => setSelectedService(service.name)}
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              {service.name} — {service.price}
            </button>
          ))}
        </div>

        {selectedService && (
          <div style={{
            marginTop: "25px",
            padding: "20px",
            background: "#f0f4f8",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <h3>{selectedService}</h3>
            <p>You selected this service.</p>
            <button style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}>
              Continue Order
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
