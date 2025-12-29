import React, { useState } from "react";
import axios from "axios";

export default function AddProductForm() {
  const [product, setProduct] = useState({
    product_name: "",
    unit: "",
    category: "",
    description: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-product", product);
      alert("✅ Product added successfully!");
      setProduct({ product_name: "", unit: "", category: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">
        ➕ Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="product_name"
          value={product.product_name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="unit"
          value={product.unit}
          onChange={handleChange}
          placeholder="Unit (e.g. Pieces)"
          className="w-full border rounded-lg p-2"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category (e.g. Electrical)"
          className="w-full border rounded-lg p-2"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-lg p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
