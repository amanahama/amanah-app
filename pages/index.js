
       import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

// Khalifa Business ID
const BUSINESS_ID = "8af0668b-070e-453a-bc6a-3188f4469511";

export default function Home() {
  const [selectedService, setSelectedService] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderDetails, setOrderDetails] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const services = [
    {
      name: "Basic",
      price: "₦2,000",
      amount: 2000
    },
    {
      name: "Standard",
      price: "₦5,000",
      amount: 5000
    },
    {
      name: "Premium",
      price: "₦10,000",
      amount: 10000
    },
    {
      name: "Custom / Large Order",
      price: "Contact us for price",
      amount: 0
    }
  ];

  const selectedServiceData = services.find(
    (service) => service.name === selectedService
  );

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !address ||
      !orderDetails
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("orders")
        .insert([
          {
            "Customer-name": fullName,
            "Phone": phoneNumber,
            "Email": email,
            "Address": address,
            "Order-details": orderDetails,
            "Service": selectedService,
            "Amount": selectedServiceData?.amount || 0,
            "Status": "Pending",
            business_id: BUSINESS_ID
          }
        ]);

      if (error) {
        throw error;
      }

      setMessage("Order submitted successfully! 🎉");

      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      setOrderDetails("");
    } catch (error) {
      console.error("Supabase Error:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fa"
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          OrderNa
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666"
          }}
        >
          Order easily and quickly
        </p>

        {!showForm ? (
          <>
            <h2>Choose a Service</h2>

            <div
              style={{
                display: "grid",
                gap: "12px"
              }}
            >
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
              <div
                style={{
                  marginTop: "25px",
                  padding: "20px",
                  background: "#f0f4f8",
                  borderRadius: "12px",
                  textAlign: "center"
                }}
              >
                <h3>{selectedService}</h3>

                <p>
                  You selected this service.
                </p>

                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                >
                  Continue Order
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2>Order Form</h2>

            <p>
              Selected service:{" "}
              <strong>{selectedService}</strong>
            </p>

            <form onSubmit={handleSubmit}>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={inputStyle}
              />

              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={inputStyle}
              />

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />

              <label>Address</label>

              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={inputStyle}
              />

              <label>Order Details</label>

              <textarea
                placeholder="Describe your order"
                rows="5"
                value={orderDetails}
                onChange={(e) => setOrderDetails(e.target.value)}
                style={inputStyle}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px"
                }}
              >
                {loading ? "Submitting..." : "Submit Order"}
              </button>
            </form>

            {message && (
              <p
                style={{
                  marginTop: "15px",
                  textAlign: "center",
                  wordBreak: "break-word"
                }}
              >
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
      } 
