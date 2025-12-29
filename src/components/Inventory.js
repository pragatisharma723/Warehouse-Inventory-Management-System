
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Inventory() {
//   const [inventory, setInventory] = useState([]);
//   const [form, setForm] = useState({ batch_id:"", shelf_id:"", available_stock:"", product_id:"" });

//   useEffect(() => { loadInventory(); }, []);

//   const loadInventory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/inventory");
//       setInventory(res.data || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load inventory");
//     }
//   };

//   const handleChange = (e) => setForm(prev => ({...prev, [e.target.name]: e.target.value}));

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/inventory", {
//         batch_id: Number(form.batch_id),
//         shelf_id: Number(form.shelf_id),
//         current_quantity: Number(form.available_stock)
//       });
//       setForm({ batch_id:"", shelf_id:"", available_stock:"", product_id:"" });
//       loadInventory();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add inventory");
//     }
//   };

//   const handleUpdate = async (batch_id, product_id, currentStock) => {
//     const newQtyStr = prompt("Enter updated stock for batch " + batch_id + ":", currentStock);
//     if (newQtyStr === null) return;
//     const newQty = Number(newQtyStr);
//     if (isNaN(newQty)) { alert("Enter a number"); return; }

//     try {
//       await axios.put(`http://localhost:5000/inventory/${batch_id}`, { available_stock: newQty, product_id });
//       loadInventory();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update inventory");
//     }
//   };

//   return (
//     <div>
//       <div className="card-custom p-3 mb-3">
//         <h5>➕ Add Inventory Record</h5>
//         <form className="row g-3" onSubmit={handleAdd}>
//           <div className="col-md-3"><input name="batch_id" value={form.batch_id} onChange={handleChange} className="form-control" placeholder="Batch ID" required /></div>
//           <div className="col-md-3"><input name="shelf_id" value={form.shelf_id} onChange={handleChange} className="form-control" placeholder="Shelf ID" required /></div>
//           <div className="col-md-3"><input name="available_stock" value={form.available_stock} onChange={handleChange} type="number" min="0" className="form-control" placeholder="Quantity" required /></div>
//           <div className="col-md-3 d-grid"><button className="btn btn-primary">Add Inventory</button></div>
//         </form>
//       </div>

//       <div className="card-custom p-3">
//         <h5>📋 Inventory</h5>
//         <div className="table-responsive">
//           <table className="table table-striped table-bordered mt-2">
//             <thead className="table-dark">
//               <tr>
//                 <th>S.No</th>
//                 <th>Batch ID</th>
//                 <th>Product</th>
//                 <th>Available Stock</th>
//                 <th>Shelf</th>
//                 <th>Last Updated</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {inventory.length === 0 ? (
//                 <tr><td colSpan={7} className="text-center">No inventory</td></tr>
//               ) : inventory.map((i, idx) => (
//                 <tr key={i.batch_id}>
//                   <td>{idx + 1}</td>
//                   <td>{i.batch_id}</td>
//                   <td>{i.product_name}</td>
//                   <td>{i.available_stock ?? i.current_quantity}</td>
//                   <td>{i.shelf_code}</td>
//                   <td>{i.last_updated}</td>
//                   <td>
//                     <button className="btn btn-sm btn-outline-light me-2" onClick={() => handleUpdate(i.batch_id, i.product_id, i.available_stock ?? i.current_quantity)}>Edit</button>
//                   </td>
//                   <td>
//   {i.stock > i.reorder_level ? (
//     <span className="badge-ok">✅ OK</span>
//   ) : (
//     <span className="badge-low">⚠ LOW</span>
//   )}
// </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }







// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Inventory() {
//   const [inventory, setInventory] = useState([]);

//   const [form, setForm] = useState({
//     batch_id: "",
//     shelf_id: "",
//     available_stock: ""
//   });

//   useEffect(() => {
//     loadInventory();
//   }, []);

//   const loadInventory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/inventory");
//       setInventory(res.data || []);
//     } catch (err) {
//       console.error("❌ Load Inventory Error:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();

//     if (!form.batch_id || !form.shelf_id || form.available_stock === "") {
//       alert("⚠ Please fill all fields");
//       return;
//     }

//     try {
//       const payload = {
//         batch_id: Number(form.batch_id),
//         shelf_id: Number(form.shelf_id),
//         available_stock: Number(form.available_stock)
//       };

//       await axios.post("http://localhost:5000/inventory", payload);

//       alert("✅ Inventory Added");
//       setForm({ batch_id: "", shelf_id: "", available_stock: "" });
//       loadInventory();

//     } catch (err) {
//       console.error("❌ Add Inventory Error:", err);

//       if (err.response) alert("❌ Server: " + err.response.data.error);
//       else alert("❌ Failed to add inventory");
//     }
//   };

//   return (
//     <div>
//       <div className="card-custom p-3 mb-3">
//         <h5>➕ Add Inventory</h5>

//         <form className="row g-3" onSubmit={handleAdd}>
          
//           <div className="col-md-3">
//             <input
//               name="batch_id"
//               className="form-control"
//               value={form.batch_id}
//               onChange={handleChange}
//               placeholder="Batch ID"
//               required
//             />
//           </div>

//           <div className="col-md-3">
//             <input
//               name="shelf_id"
//               className="form-control"
//               value={form.shelf_id}
//               onChange={handleChange}
//               placeholder="Shelf ID"
//               required
//             />
//           </div>

//           <div className="col-md-3">
//             <input
//               name="available_stock"
//               type="number"
//               className="form-control"
//               value={form.available_stock}
//               onChange={handleChange}
//               placeholder="Stock"
//               required
//             />
//           </div>

//           <div className="col-md-3 d-grid">
//             <button className="btn btn-primary">Add</button>
//           </div>

//         </form>
//       </div>

//       <div className="card-custom p-3">
//         <h5>📦 Inventory Records</h5>

//         <table className="table table-bordered table-striped mt-3">
//           <thead className="table-dark">
//             <tr>
//               <th>S.No</th>
//               <th>Batch</th>
//               <th>Product</th>
//               <th>Stock</th>
//               <th>Shelf</th>
//               <th>Last Updated</th>
//             </tr>
//           </thead>

//           <tbody>
//             {inventory.map((i, index) => (
//               <tr key={i.batch_id}>
//                 <td>{index + 1}</td>
//                 <td>{i.batch_id}</td>
//                 <td>{i.product_name}</td>
//                 <td>{i.available_stock}</td>
//                 <td>{i.shelf_code}</td>
//                 <td>{i.last_updated}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Inventory() {
//   const [inventory, setInventory] = useState([]);
//   const [batches, setBatches] = useState([]);       // ✅ dropdown for batch
//   const [shelves, setShelves] = useState([]);       // ✅ dropdown for shelf based on batch
//   const [form, setForm] = useState({
//     batch_id: "",
//     shelf_id: "",
//     available_stock: ""
//   });

//   useEffect(() => {
//     loadInventory();
//     loadBatches();
//   }, []);

//   // ✅ Load all inventory items
//   const loadInventory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/inventory");
//       setInventory(res.data || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load inventory");
//     }
//   };

//   // ✅ Load all batches for dropdown
//   const loadBatches = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/batches");
//       setBatches(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ When batch changes → auto-fill shelf dropdown
//   const handleBatchChange = async (e) => {
//     const batchId = e.target.value;
//     setForm((prev) => ({ ...prev, batch_id: batchId }));

//     if (!batchId) return;

//     // fetch shelf from backend
//     const batch = batches.find((b) => String(b.batch_id) === String(batchId));
//     if (batch && batch.shelf_code) {
//       // You may not have shelf_id in batches table → so we force shelf 1
//       setForm((prev) => ({ ...prev, shelf_id: 1 }));
//     }
//   };

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   //✅ Add inventory
//   const handleAdd = async (e) => {
//     e.preventDefault();

//     if (!form.batch_id || !form.shelf_id || form.available_stock === "") {
//       alert("⚠ Please fill all fields");
//       return;
//     }

//     try {
//       const payload = {
//         batch_id: Number(form.batch_id),
//         shelf_id: Number(form.shelf_id),
//         available_stock: Number(form.available_stock)
//       };

//      const res = await axios.post("http://localhost:5000/inventory", payload);
//       console.log("✅ ADD RESPONSE:", res.data);

//       alert("✅ Inventory record added!");

//       setForm({ batch_id: "", shelf_id: "", available_stock: "" });
//       loadInventory();
//     } catch (err) {
//       console.error("❌ Inventory Add Error:", err.response?.data || err);
//       alert("❌ Failed to add inventory: " + (err.response?.data?.error || ""));
//     }
//   };

//   // ✅ Update inventory
//   const handleUpdate = async (batch_id, product_id, currentStock) => {
//     const newQtyStr = prompt(
//       "Enter updated stock for batch " + batch_id + ":",
//       currentStock
//     );

//     if (newQtyStr === null) return;

//     const newQty = Number(newQtyStr);
//     if (isNaN(newQty)) return alert("Enter a valid number!");

//     try {
//       await axios.put(`http://localhost:5000/inventory/${batch_id}`, {
//         available_stock: newQty,
//         product_id
//       });

//       loadInventory();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update inventory");
//     }
//   };

//   return (
//     <div>
//       {/* ✅ ADD INVENTORY FORM */}
//       <div className="card-custom p-3 mb-3 fade-in">
//         <h5>➕ Add Inventory</h5>
//         <form className="row g-3" onSubmit={handleAdd}>
          
//           {/* ✅ Batch Dropdown */}
//           <div className="col-md-3">
//             <select
//               name="batch_id"
//               value={form.batch_id}
//               onChange={handleBatchChange}
//               className="form-control"
//               required
//             >
//               <option value="">Select Batch</option>
//               {batches.map((b) => (
//                 <option key={b.batch_id} value={b.batch_id}>
//                   Batch {b.batch_id} – {b.product_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ✅ Shelf ID */}
//           <div className="col-md-3">
//             <input
//               name="shelf_id"
//               value={form.shelf_id}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Shelf ID"
//               required
//             />
//           </div>

//           {/* ✅ Quantity */}
//           <div className="col-md-3">
//             <input
//               name="available_stock"
//               value={form.available_stock}
//               onChange={handleChange}
//               type="number"
//               min="0"
//               className="form-control"
//               placeholder="Quantity"
//               required
//             />
//           </div>

//           {/* ✅ Add Button */}
//           <div className="col-md-3 d-grid">
//             <button className="btn btn-success">Add Inventory</button>
//           </div>
//         </form>
//       </div>

//       {/* ✅ INVENTORY TABLE */}
//       <div className="card-custom p-3 fade-in">
//         <h5>📋 Inventory</h5>
//         <div className="table-responsive">
//           <table className="table table-hover table-bordered mt-2">
//             <thead className="table-dark">
//               <tr>
//                 <th>S.No</th>
//                 <th>Batch ID</th>
//                 <th>Product</th>
//                 <th>Available Stock</th>
//                 <th>Shelf</th>
//                 <th>Last Updated</th>
//                 <th>Status</th>
//                 <th>Edit</th>
//               </tr>
//             </thead>

//             <tbody>
//               {inventory.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="text-center">
//                     No inventory
//                   </td>
//                 </tr>
//               ) : (
//                 inventory.map((i, idx) => (
//                   <tr key={i.batch_id}>
//                     <td>{idx + 1}</td>
//                     <td>{i.batch_id}</td>
//                     <td>{i.product_name}</td>
//                     <td>{i.available_stock}</td>
//                     <td>{i.shelf_code}</td>
//                     <td>{i.last_updated}</td>

//                     {/* ✅ OK / LOW indicator */}
//                     <td>
//                       {i.available_stock > 10 ? (
//                         <span className="badge bg-success"> OK</span>
//                       ) : (
//                         <span className="badge bg-danger">⚠ LOW</span>
//                       )}
//                     </td>

//                     {/* ✅ Visible Edit button */}
//                     <td>
//                       <button
//                         className="btn btn-sm btn-warning"
//                         onClick={() =>
//                           handleUpdate(
//                             i.batch_id,
//                             i.product_id,
//                             i.available_stock
//                           )
//                         }
//                       >
//                         ✏ Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ✅ Animation CSS */}
//       <style>{`
//         .fade-in { animation: fadeIn 0.5s ease-in-out; }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

//         .btn-warning {
//           color: black;
//           font-weight: bold;
//         }

//         .card-custom {
//           background: rgba(255,255,255,0.12);
//           backdrop-filter: blur(8px);
//           border-radius: 12px;
//         }
//       `}</style>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    loadInventory();
  }, []);

  // ✅ Load Inventory
  const loadInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory");
      setInventory(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load inventory");
    }
  };

  // ✅ Update inventory stock
  const handleUpdate = async (batch_id, product_id, currentStock) => {
    const newQtyStr = prompt(
      `Enter updated stock for Batch ${batch_id}:`,
      currentStock
    );

    if (newQtyStr === null) return;

    const newQty = Number(newQtyStr);
    if (isNaN(newQty)) return alert("Enter a valid number!");

    try {
      await axios.put(`http://localhost:5000/inventory/${batch_id}`, {
        available_stock: newQty,
        product_id,
      });

      loadInventory();
      alert("✅ Updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update!");
    }
  };

  return (
    <div>
      {/* ✅ INVENTORY TABLE ONLY (Add removed) */}
      <div className="card-custom p-3 fade-in">
        <h5>📋 Inventory</h5>

        <div className="table-responsive">
          <table className="table table-hover table-bordered mt-2">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Batch ID</th>
                <th>Product</th>
                <th>Available Stock</th>
                <th>Shelf</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    No inventory found
                  </td>
                </tr>
              ) : (
                inventory.map((i, idx) => {
                  const stock = Number(i.available_stock || 0);
                  const reorder = Number(i.reorder_level || 0); // ✅ FIXED status logic

                  return (
                    <tr key={i.batch_id}>
                      <td>{idx + 1}</td>
                      <td>{i.batch_id}</td>
                      <td>{i.product_name}</td>
                      <td>{stock}</td>
                      <td>{i.shelf_code}</td>
                      <td>{i.last_updated}</td>

                      {/* ✅ LOW / OK Status (NOW CORRECT after edit also) */}
                      <td>
                        {stock > reorder ? (
                          <span className="badge bg-success">✅ OK</span>
                        ) : (
                          <span className="badge bg-danger">⚠ LOW</span>
                        )}
                      </td>

                      {/* ✅ DARK BLUE EDIT BUTTON */}
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{
                            background: "#1e40af", // dark blue
                            color: "white",
                            fontWeight: "600",
                            padding: "4px 10px",
                            borderRadius: "6px",
                          }}
                          onClick={() =>
                            handleUpdate(i.batch_id, i.product_id, stock)
                          }
                        >
                          ✏ Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Smooth Animation */}
      <style>{`
        .fade-in {
          animation: fadeIn .4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-custom {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
