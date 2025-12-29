// // // import { useEffect, useState } from "react";
// // // import axios from "axios";

// // // export default function Products() {
// // //   const [products, setProducts] = useState([]);
// // //   const [form, setForm] = useState({ product_name: "", unit: "", category: "", description: "" });

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   const fetchProducts = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:5000/products");
// // //       setProducts(res.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Error fetching products");
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await axios.post("http://localhost:5000/products", form);
// // //       fetchProducts();
// // //       setForm({ product_name: "", unit: "", category: "", description: "" });
// // //       alert("✅ Product added!");
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to add product");
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h5 className="mb-3">Add New Product</h5>
// // //       <form className="row g-3 mb-4" onSubmit={handleSubmit}>
// // //         <div className="col-md-3">
// // //           <input className="form-control" placeholder="Product Name" value={form.product_name}
// // //             onChange={(e) => setForm({ ...form, product_name: e.target.value })} required />
// // //         </div>
// // //         <div className="col-md-2">
// // //           <input className="form-control" placeholder="Unit" value={form.unit}
// // //             onChange={(e) => setForm({ ...form, unit: e.target.value })} required />
// // //         </div>
// // //         <div className="col-md-3">
// // //           <input className="form-control" placeholder="Category" value={form.category}
// // //             onChange={(e) => setForm({ ...form, category: e.target.value })} required />
// // //         </div>
// // //         <div className="col-md-3">
// // //           <input className="form-control" placeholder="Description" value={form.description}
// // //             onChange={(e) => setForm({ ...form, description: e.target.value })} />
// // //         </div>
// // //         <div className="col-md-1 d-grid">
// // //           <button className="btn btn-primary">Add</button>
// // //         </div>
// // //       </form>

// // //       <h5>Product List</h5>
// // //       <table className="table table-striped table-bordered">
// // //         <thead className="table-dark">
// // //           <tr>
// // //             <th>ID</th>
// // //             <th>Name</th>
// // //             <th>Unit</th>
// // //             <th>Category</th>
// // //             <th>Description</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {products.map((p) => (
// // //             <tr key={p.product_id}>
// // //               <td>{p.product_id}</td>
// // //               <td>{p.product_name}</td>
// // //               <td>{p.unit}</td>
// // //               <td>{p.category}</td>
// // //               <td>{p.description}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }




// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function Products() {
// //   const [products, setProducts] = useState([]);
// //   const [form, setForm] = useState({
// //     product_name: "",
// //     unit: "",
// //     category: "",
// //     description: ""
// //   });

// //   useEffect(() => {
// //     loadProducts();
// //   }, []);

// //   const loadProducts = async () => {
// //     const res = await axios.get("http://localhost:5000/products");
// //     setProducts(res.data);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await axios.post("http://localhost:5000/products", form);
// //     alert("✅ Product Added");
// //     setForm({ product_name: "", unit: "", category: "", description: "" });
// //     loadProducts();
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this product?")) return;
// //     await axios.delete(`http://localhost:5000/products/${id}`);
// //     loadProducts();
// //     alert("🗑️ Product deleted");
// //   };

// //   return (
// //     <div>
// //       <h4>➕ Add Product</h4>

// //       <form className="row g-3 mb-4" onSubmit={handleSubmit}>
// //         <div className="col-md-3">
// //           <input
// //             className="form-control"
// //             placeholder="Product Name"
// //             value={form.product_name}
// //             onChange={(e) => setForm({ ...form, product_name: e.target.value })}
// //             required
// //           />
// //         </div>

// //         <div className="col-md-2">
// //           <input
// //             className="form-control"
// //             placeholder="Unit"
// //             value={form.unit}
// //             onChange={(e) => setForm({ ...form, unit: e.target.value })}
// //             required
// //           />
// //         </div>

// //         <div className="col-md-3">
// //           <input
// //             className="form-control"
// //             placeholder="Category"
// //             value={form.category}
// //             onChange={(e) => setForm({ ...form, category: e.target.value })}
// //             required
// //           />
// //         </div>

// //         <div className="col-md-3">
// //           <input
// //             className="form-control"
// //             placeholder="Description"
// //             value={form.description}
// //             onChange={(e) => setForm({ ...form, description: e.target.value })}
// //           />
// //         </div>

// //         <div className="col-md-1 d-grid">
// //           <button className="btn btn-primary">Add</button>
// //         </div>
// //       </form>

// //       <h4>📋 Product List</h4>

// //       <table className="table table-bordered table-striped">
// //         <thead className="table-dark">
// //           <tr>
// //             <th>S.No</th>       {/* ✅ Serial number column */}
// //             <th>Name</th>
// //             <th>Unit</th>
// //             <th>Category</th>
// //             <th>Description</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {products.map((p, index) => (
// //             <tr key={p.product_id}>
// //               <td>{index + 1}</td>     {/* ✅ Serial number instead of product_id */}
// //               <td>{p.product_name}</td>
// //               <td>{p.unit}</td>
// //               <td>{p.category}</td>
// //               <td>{p.description}</td>

// //               <td>
// //                 <button
// //                   className="btn btn-danger btn-sm"
// //                   onClick={() => handleDelete(p.product_id)}
// //                 >
// //                   Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>

// //       </table>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Products() {
//   const [products, setProducts] = useState([]);

//   const [form, setForm] = useState({
//     product_name: "",
//     unit: "",
//     category: "",
//     description: "",
//     quantity: "",
//     reorder_level: ""
//   });

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/products");
//       setProducts(res.data || []);
//     } catch (err) {
//       console.error("Error loading products:", err);
//       alert("Could not load products. Check backend.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // prepare payload: convert numeric fields to numbers
//     const payload = {
//       ...form,
//       quantity: form.quantity === "" ? 0 : Number(form.quantity),
//       reorder_level: form.reorder_level === "" ? 0 : Number(form.reorder_level)
//     };

//     try {
//       await axios.post("http://localhost:5000/products", payload);
//       alert("✅ Product Added");
//       setForm({
//         product_name: "",
//         unit: "",
//         category: "",
//         description: "",
//         quantity: "",
//         reorder_level: ""
//       });
//       loadProducts();
//     } catch (err) {
//       console.error("Error adding product:", err);
//       alert("Failed to add product. Check backend.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/products/${id}`);
//       alert("🗑️ Product deleted");
//       loadProducts();
//     } catch (err) {
//       console.error("Error deleting product:", err);
//       alert("Failed to delete product.");
//     }
//   };

//   return (
//     <div>
//       <h4>➕ Add Product</h4>

//       {/* UPDATED FORM WITH QUANTITY + REORDER LEVEL */}
//       <form className="row g-3 mb-4" onSubmit={handleSubmit}>
//         <div className="col-md-3">
//           <input
//             name="product_name"
//             className="form-control"
//             placeholder="Product Name"
//             value={form.product_name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="col-md-2">
//           <input
//             name="unit"
//             className="form-control"
//             placeholder="Unit (pcs/kg)"
//             value={form.unit}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="col-md-2">
//           <input
//             name="category"
//             className="form-control"
//             placeholder="Category"
//             value={form.category}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="col-md-5">
//           <input
//             name="description"
//             className="form-control"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Quantity */}
//         <div className="col-md-2">
//           <input
//             name="quantity"
//             className="form-control"
//             type="number"
//             placeholder="Quantity"
//             value={form.quantity}
//             onChange={handleChange}
//             required
//             min="0"
//           />
//         </div>

//         {/* Reorder Level */}
//         <div className="col-md-2">
//           <input
//             name="reorder_level"
//             className="form-control"
//             type="number"
//             placeholder="Reorder Level"
//             value={form.reorder_level}
//             onChange={handleChange}
//             required
//             min="0"
//           />
//         </div>

//         <div className="col-md-2 d-grid">
//           <button className="btn btn-primary">Add</button>
//         </div>
//       </form>

//       <h4>📋 Product List</h4>

//       <div className="table-responsive">
//         <table className="table table-bordered table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>Unit</th>
//               <th>Category</th>
//               <th>Description</th>
//               <th>Quantity</th>
//               <th>Reorder Level</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="text-center">
//                   No products found
//                 </td>
//               </tr>
//             ) : (
//               products.map((p, index) => (
//                 <tr key={p.product_id ?? index}>
//                   <td>{index + 1}</td>
//                   <td>{p.product_name}</td>
//                   <td>{p.unit}</td>
//                   <td>{p.category}</td>
//                   <td>{p.description}</td>
//                   <td>{p.quantity}</td>
//                   <td>{p.reorder_level}</td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(p.product_id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_name: "",
    unit: "",
    category: "",
    description: "",
    quantity: "",
    reorder_level: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Load products error:", err);
      alert("Could not load products. Is the backend running?");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      quantity: form.quantity === "" ? 0 : Number(form.quantity),
      reorder_level: form.reorder_level === "" ? 0 : Number(form.reorder_level)
    };
    try {
      await axios.post("http://localhost:5000/products", payload);
      setForm({ product_name:"", unit:"", category:"", description:"", quantity:"", reorder_level:"" });
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to add product.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  return (
    <div>
      <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="card-custom p-3 mb-3">
        <h5>➕ Add Product</h5>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4"><input name="product_name" value={form.product_name} onChange={handleChange} className="form-control" placeholder="Product name" required /></div>
          <div className="col-md-2"><input name="unit" value={form.unit} onChange={handleChange} className="form-control" placeholder="Unit" required /></div>
          <div className="col-md-2"><input name="category" value={form.category} onChange={handleChange} className="form-control" placeholder="Category" required /></div>
          <div className="col-md-4"><input name="description" value={form.description} onChange={handleChange} className="form-control" placeholder="Description" /></div>
          <div className="col-md-2"><input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="0" className="form-control" placeholder="Quantity" required /></div>
          <div className="col-md-2"><input name="reorder_level" value={form.reorder_level} onChange={handleChange} type="number" min="0" className="form-control" placeholder="Reorder level" required /></div>
          <div className="col-md-2 d-grid"><button className="btn btn-primary">Add</button></div>
        </form>
      </motion.div>

      <div className="card-custom p-3">
        <h5>📋 Products</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered mt-2">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Unit</th>
                <th>Category</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={9} className="text-center">No products</td></tr>
              ) : products.map((p, idx) => {
                const low = (p.quantity ?? 0) < (p.reorder_level ?? 0);
                return (
                  <tr key={p.product_id}>
                    <td>{idx + 1}</td>
                    <td>{p.product_name}</td>
                    <td>{p.unit}</td>
                    <td>{p.category}</td>
                    <td>{p.description}</td>
                    <td>{p.quantity}</td>
                    <td>{p.reorder_level}</td>
                    <td>{ low ? <span className="badge-low">Low</span> : <span className="badge-ok">OK</span> }</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.product_id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
