import "./Profile.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(
  localStorage.getItem("user")
);

const res = await API.get(
  `/orders/${user.user._id}`
);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="profile-page">
      {/* Left Sidebar */}
      <div className="profile-sidebar">
        <h2>User Profile</h2>

        <p>
          <strong>Username:</strong>{" "}
          {user?.user?.username}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.user?.email}
        </p>

        <p>
          <strong>Orders:</strong>{" "}
          {orders.length}
        </p>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      {/* Orders Section */}
      <div className="orders-section">
        <h1>Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="order-box"
            >
              <h3>
                Total Amount: ₹
                {order.totalAmount}
              </h3>

              <p>
                <strong>Status:</strong>{" "}
                {order.status}
              </p>

              <h4>Products</h4>

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
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;