const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose
  .connect("mongodb://127.0.0.1:27017/shopez")
  .then(async () => {
    console.log("MongoDB Connected");

    await Product.insertMany([
      {
        name: "OnePlus 13",
        price: 69999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        description: "OnePlus flagship smartphone",
      },
      {
        name: "Google Pixel 9",
        price: 79999,
        image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37",
        description: "Google smartphone",
      },
      {
        name: "Realme GT",
        price: 34999,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        description: "Gaming smartphone",
      },
      {
        name: "Redmi Note 14",
        price: 24999,
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
        description: "Budget smartphone",
      },
      {
        name: "MacBook Air",
        price: 99999,
        image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
        description: "Apple laptop",
      },
      {
        name: "Dell XPS 13",
        price: 109999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        description: "Dell ultrabook",
      },
      {
        name: "iPad Air",
        price: 59999,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
        description: "Apple tablet",
      },
      {
        name: "Sony WH-1000XM5",
        price: 29999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description: "Noise cancelling headphones",
      },
      {
        name: "Apple Watch",
        price: 39999,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
        description: "Smartwatch",
      },
      {
        name: "Boat Airdopes",
        price: 1499,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
        description: "Wireless earbuds",
      }
    ]);

    console.log("Products Added Successfully!");
    process.exit();
  })
  .catch((err) => console.log(err));