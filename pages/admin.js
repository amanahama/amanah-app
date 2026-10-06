import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Admin Dashboard</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <p><b>Customer:</b> {order["Customer-name"]}</p>
            <p><b>Phone:</b> {order.Phone}</p>
            <p><b>Email:</b> {order.Email}</p>
            <p><b>Service:</b> {order.Service}</p>
            <p><b>Amount:</b> {order.Amount}</p>
            <p><b>Status:</b> {order.Status}</p>
            <p><b>Address:</b> {order.Address}</p>
            <p><b>Order Details:</b> {order["Order-details"]}</p>
          </div>
        ))
      )}
    </main>
  );
            }

