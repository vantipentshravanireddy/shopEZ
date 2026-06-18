import "./Home.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const user = JSON.parse(
  localStorage.getItem("user")
);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] =
  useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    await API.post("/cart", {
      userId: user.user._id,
      productName: product.name,
      price: product.price,
      quantity: 1,
    });

    alert("Added to Cart");
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div>
      <h1>ShopEZ Products</h1>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
  className="category-filter"
  value={selectedCategory}
  onChange={(e) =>
    setSelectedCategory(e.target.value)
  }
>
  <option value="All">
    All Categories
  </option>

  <option value="Electronics">
    Electronics
  </option>

  <option value="Cricket">
    Cricket
  </option>


  <option value="Beauty">
    Beauty
  </option>
</select>

      <br />
      <br />

      <div className="products-container">
  {products
    .filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === "All" ||
        product.category === selectedCategory
    )
    .map((product) => (
            <div
              key={product._id}
              className="product-card"
            >
              <img
                src={product.image}
                alt={product.name}
              />

             <h3>{product.name}</h3>

<p>
  <strong>Category:</strong>{" "}
  {product.category}
</p>

<p>₹{product.price}</p> 

              <button
  className="add-btn"
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>

       {user?.user?.role?.toLowerCase() ===
  "admin" && (
  <button
    className="delete-btn"
    onClick={() =>
      deleteProduct(product._id)
    }
  >
    Delete Product
  </button>
)}     

            {user?.user?.role?.toLowerCase() ===
  "admin" && (
  <button
    className="edit-btn"
    onClick={async () => {
      const newPrice = prompt(
        "Enter new price"
      );

      if (!newPrice) return;

      try {
        await API.put(
          `/products/${product._id}`,
          {
            price: Number(newPrice),
          }
        );

        fetchProducts();

        alert("Product Updated");
      } catch (error) {
        console.log(error);
      }
    }}
  >
    Edit Product
  </button>
)}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;