import "./Orders.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
  try {
    let res;
    console.log("User Role:", user.user.role);
      if (
  user.user.role.toLowerCase() === "admin"
) {
      console.log("ADMIN REQUEST");
      res = await API.get("/orders");
    } else {
      res = await API.get(
        `/orders/${user.user._id}`
      );
    }

    setOrders(res.data);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="order-card"
        >
          {user?.user?.role?.toLowerCase() ===
  "admin" && (
  <>
    
  </>
)}
          <h3>
            Total Amount: ₹{order.totalAmount}
          </h3>

          <p>
            <strong>Status:</strong>{" "}
            {order.status}
          </p>

          {user?.user?.role === "admin" &&
            order.status === "Pending" && (
              <button
                className="ship-btn"
                onClick={async () => {
                  try {
                    await API.put(
                      `/orders/${order._id}`,
                      {
                        status: "Shipped",
                      }
                    );

                    fetchOrders();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Mark as Shipped
              </button>
            )}

          <h4>Products:</h4>

          {order.products?.map(
            (product, index) => (
              <div
                key={index}
                className="product-item"
              >
                <p>
                  {product.productName ||
                    product.name}
                </p>

                <p>
                  ₹{product.price}
                </p>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;