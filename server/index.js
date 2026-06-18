const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/order");
const Cart = require("./models/cart");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/shopez")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("ShopEZ Server Running");
});
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/test", (req, res) => {
  res.send("Test route works");
});
app.get("/cors-test", (req, res) => {
  res.json({ message: "cors working" });
});
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    res.json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/orders", async (req, res) => {
  try {
   const {
  userId,
  username,
  email,
} = req.body;
console.log("USERNAME:", username);
console.log("EMAIL:", email);
console.log("Received User ID:", userId);
    const cartItems = await Cart.find({
      userId,
    });

    const totalAmount = cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
  userId,
  username,
  email,
  products: cartItems,
  totalAmount,
});
    await newOrder.save();

    await Cart.deleteMany({
      userId,
    });

    res.json({
      message: "Order Placed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.post("/cart", async (req, res) => {
  try {
    const cartItem = new Cart(req.body);

    await cartItem.save();

    res.status(201).json({
      message: "Item Added To Cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/cart/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.find({
      userId: req.params.userId,
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.delete("/cart/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item Removed From Cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    console.log("ALL ORDERS:", orders.length);

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/orders/:userId", async (req, res) => {
  try {
    console.log(
      "Searching Orders For:",
      req.params.userId
    );

    const orders = await Order.find({
      userId: req.params.userId,
    });

    console.log("Orders Found:", orders);

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.put("/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/dashboard", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (total, order) =>
        total + order.totalAmount,
      0
    );

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});