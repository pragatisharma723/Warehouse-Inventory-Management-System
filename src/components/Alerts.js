// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function Alerts() {
// //   const [alerts, setAlerts] = useState([]);

// //   useEffect(() => {
// //     fetchAlerts();
// //   }, []);

// //   const fetchAlerts = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/alerts");
// //       setAlerts(res.data);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error fetching alerts");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h5>Reorder Alerts</h5>
// //       <table className="table table-striped table-bordered">
// //         <thead className="table-dark">
// //           <tr>
// //             <th>ID</th>
// //             <th>Product</th>
// //             <th>Message</th>
// //             <th>Date</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {alerts.map((a) => (
// //             <tr key={a.alert_id}>
// //               <td>{a.alert_id}</td>
// //               <td>{a.product_name}</td>
// //               <td>{a.message}</td>
// //               <td>{a.alert_date}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Alerts() {
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     loadAlerts();
//   }, []);

//   const loadAlerts = async () => {
//     const res = await axios.get("http://localhost:5000/alerts");
//     setAlerts(res.data);
//   };

//   return (
//     <div>
//       <h4>⚠️ Reorder Alerts</h4>

//       <table className="table table-striped table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>S.No</th> {/* ✅ SERIAL NUMBER */}
//             <th>Product Name</th>
//             <th>Message</th>
//             <th>Alert Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           {alerts.map((a, index) => (
//             <tr key={a.alert_id}>
//               <td>{index + 1}</td> {/* ✅ SERIAL NUMBER */}
//               <td>{a.product_name}</td>
//               <td>{a.message}</td>
//               <td>{a.alert_date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => { loadAlerts(); }, []);

  const loadAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/alerts");
      setAlerts(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load alerts");
    }
  };

  return (
    <div>
      <div className="card-custom p-3">
        <h5>⚠️ Reorder Alerts</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered mt-2">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Product</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length === 0 ? (
                <tr><td colSpan={4} className="text-center">No alerts</td></tr>
              ) : alerts.map((a, idx) => (
                <tr key={a.alert_id}>
                  <td>{idx + 1}</td>
                  <td>{a.product_name}</td>
                  <td>{a.message}</td>
                  <td>{new Date(a.alert_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
