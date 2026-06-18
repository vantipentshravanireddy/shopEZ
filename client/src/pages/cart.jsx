import "./Cart.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    console.log("User:", user);
    console.log("User ID:", user.user._id);

    const res = await API.get(
      `/cart/${user.user._id}`
    );

    console.log("Cart Data:", res.data);

    setCartItems(res.data);
  } catch (error) {
    console.log(error);
  }
};
  const removeFromCart = async (id) => {
    try {
      console.log("Deleting:", id);

      const res = await API.delete(`/cart/${id}`);

      console.log("Response:", res.data);

      alert("Item Removed");

      setCartItems(
        cartItems.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.log("Error:", error);
      alert("Delete Failed");
    }
  };
  const totalPrice = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
const placeOrder = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await API.post("/orders", {
  userId: user.user._id,
  username: user.user.username,
  email: user.user.email,
});

    alert(res.data.message);

    fetchCartItems();
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || error.message);
  }
};
  
    return (
  <div className="cart-container">
      <h1 className="cart-title">My Cart</h1>

       <div className="cart-summary">
  <h3>Items: {cartItems.length}</h3>

  <h2>Total Price: ₹{totalPrice}</h2>

  <button
    className="place-order-btn"
    onClick={placeOrder}
  >
    Place Order
  </button>
</div>
      {cartItems.map((item) => (
        <div key={item._id} className="cart-card">
          <h3>{item.productName}</h3>

          <p>₹{item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <button
  className="remove-btn"
  onClick={() =>
    removeFromCart(item._id)
  }
>
  Remove
</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Cart;