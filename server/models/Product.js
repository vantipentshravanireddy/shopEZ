const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,

  price: Number,

  image: String,

  category: {
    type: String,
    default: "Electronics",
  },
});

module.exports = mongoose.model(
  "Product",
  productSchema
);