import { useEffect, useState } from "react";
import axios from "axios";

export default function Batches() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      const res = await axios.get("http://localhost:5000/batches");
      setBatches(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load batches");
    }
  };

  return (
    <div>
      <div className="card-custom p-3">
        <h5>📦 Batches</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered mt-2">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Batch ID</th>
                <th>Product</th>
                <th>Batch Quantity</th>
                <th>Shelf</th>
              </tr>
            </thead>
            <tbody>
              {batches.length === 0 ? (
                <tr><td colSpan={5} className="text-center">No batches</td></tr>
              ) : batches.map((b, idx) => (
                <tr key={b.batch_id}>
                  <td>{idx + 1}</td>
                  <td>{b.batch_id}</td>
                  <td>{b.product_name}</td>
                  <td>{b.batch_quantity}</td>
                  <td>{b.shelf_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

