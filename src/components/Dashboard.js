// src/components/Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, Legend
} from "recharts";
import { motion } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard() {
  // summary counts
  const [summary, setSummary] = useState({ products: 0, batches: 0, inventory: 0, alerts: 0 });

  // chart data
  const [productData, setProductData] = useState([]);   // { name, qty }
  const [categoryData, setCategoryData] = useState([]); // { name, value, color }
  const [inventoryData, setInventoryData] = useState([]); // { name, stock }
  const [alertTrend, setAlertTrend] = useState([]);     // { date, alerts }

  const COLORS = ["#60a5fa", "#38bdf8", "#7c3aed", "#f97316", "#ef4444", "#34d399", "#f59e0b"];

  useEffect(() => {
    // load everything
    loadSummary();
    loadProducts();
    loadCategories();
    loadInventory();
    loadAlerts();

    // some chart libs need a window resize after mount to calculate sizes properly
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
    return () => clearTimeout(t);
  }, []);

  // --------------------------
  // 1) summary
  // --------------------------
  const loadSummary = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dashboard/summary");
      setSummary(res.data || { products: 0, batches: 0, inventory: 0, alerts: 0 });
    } catch (err) {
      console.error("loadSummary:", err);
      setSummary({ products: 0, batches: 0, inventory: 0, alerts: 0 });
    }
  };

  // --------------------------
  // 2) products (bar chart by quantity)
  // --------------------------
  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      const rows = res.data || [];
      // map product name -> quantity (if no quantity, fallback 0)
      const mapped = rows.map(p => ({
        name: p.product_name || "Unknown",
        qty: Number(p.quantity ?? 0)
      }));
      // sort descending by qty so top items appear
      mapped.sort((a, b) => b.qty - a.qty);
      setProductData(mapped.slice(0, 12)); // top 12
    } catch (err) {
      console.error("loadProducts:", err);
      setProductData([]);
    }
  };

  // --------------------------
  // 3) category pie (category distribution by total quantity)
  // --------------------------
  const loadCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      const rows = res.data || [];
      const agg = {};
      rows.forEach(p => {
        const cat = (p.category || "Uncategorized").trim();
        const qty = Number(p.quantity ?? 0);
        agg[cat] = (agg[cat] || 0) + qty;
      });
      const arr = Object.keys(agg).map((k, i) => ({
        name: k,
        value: agg[k],
        color: COLORS[i % COLORS.length]
      }));
      setCategoryData(arr);
    } catch (err) {
      console.error("loadCategories:", err);
      setCategoryData([]);
    }
  };


  <ResponsiveContainer width="100%" height="85%">
  <PieChart>
    <Pie
      data={categoryData}
      dataKey="value"
      nameKey="name"
      outerRadius={95}
      label={false}   // ✅ removed category text on pie
    >
      {categoryData.map((entry, index) => (
        <Cell key={index} fill={entry.color} />
      ))}
    </Pie>

    <Legend
      verticalAlign="bottom"
      height={36}
      wrapperStyle={{
        fontSize: "13px",
        paddingTop: "10px",
        color: "#e0ecff",
      }}
    />

    <Tooltip />
  </PieChart>
</ResponsiveContainer>


  // --------------------------
  // 4) inventory (area chart) - uses available_stock
  // --------------------------
  const loadInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory");
      const rows = res.data || [];
      // Use available_stock explicitly (your DB uses available_stock)
      const arr = rows.map(r => ({
        name: r.product_name || `Batch ${r.batch_id || r.inventory_id || "?"}`,
        stock: Number(r.available_stock ?? r.current_quantity ?? 0)
      }));
      // sort or keep original; limit to top 12 for readability
      arr.sort((a, b) => b.stock - a.stock);
      setInventoryData(arr.slice(0, 12));
    } catch (err) {
      console.error("loadInventory:", err);
      setInventoryData([]);
    }
  };

  // --------------------------
  // 5) alerts trend (line chart)
  // --------------------------
  const loadAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/alerts");
      const rows = res.data || [];
      // group by date (YYYY-MM-DD)
      const grouped = {};
      rows.forEach(r => {
        const d = r.alert_date ? String(r.alert_date).slice(0, 10) : "unknown";
        grouped[d] = (grouped[d] || 0) + 1;
      });
      const arr = Object.keys(grouped).map(k => ({ date: k, alerts: grouped[k] }));
      // sort by date ascending
      arr.sort((a, b) => (a.date > b.date ? 1 : -1));
      setAlertTrend(arr);
    } catch (err) {
      console.error("loadAlerts:", err);
      setAlertTrend([]);
    }
  };

  // tooltip formatter helpers to ensure hover displays correct values
  const productTooltipFormatter = (value) => [`${value}`, "Quantity"];
  const pieTooltipFormatter = (value) => [`${value}`, "Qty"];
  const inventoryTooltipFormatter = (value) => [`${value}`, "Stock"];
  const alertsTooltipFormatter = (value) => [`${value}`, "Alerts"];

  return (
    <div className="dashboard-wrapper">

      {/* STAT CARDS */}
      <div className="stats-row">
        <motion.div className="stat" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h6>Products</h6>
          <h3>{summary.products}</h3>
        </motion.div>

        <motion.div className="stat" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.06 }}>
          <h6>Batches</h6>
          <h3>{summary.batches}</h3>
        </motion.div>

        <motion.div className="stat" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }}>
          <h6>Inventory Items</h6>
          <h3>{summary.inventory}</h3>
        </motion.div>

        <motion.div className="stat" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 }}>
          <h6>Reorder Alerts</h6>
          <h3>{summary.alerts}</h3>
        </motion.div>
      </div>

      {/* CHARTS GRID */}
      <div className="charts-grid">

        {/* 1) PRODUCTS - BAR */}
        <div className="card chart-card">
          <div className="card-header">
            <h5>📦 Top Products by Quantity</h5>
          </div>
          <div className="card-body chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <XAxis dataKey="name" tick={{ fill: "#cfe3ff", fontSize: 12 }} />
                <YAxis tick={{ fill: "#cfe3ff" }} />
                <Tooltip formatter={productTooltipFormatter} />
                <Bar dataKey="qty" fill={COLORS[1]} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2) CATEGORY - PIE */}
        {/* <div className="card chart-card">
          <div className="card-header">
            <h5>📂 Category Distribution (by quantity)</h5>
          </div>
          <div className="card-body chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${Math.round(percent * 100)}%)`}
                >
                  {categoryData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color || COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={pieTooltipFormatter} />
                <Legend wrapperStyle={{ color: "#e6eef8" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div> */}


{/* ✅ CATEGORY DISTRIBUTION - INTERACTIVE PIE CHART (Labels Slightly Lower) */}
<div className="card chart-card">
  <div className="card-header">
    <h5 style={{ color: "#fff" }}>📂 Category Distribution (by quantity)</h5>
  </div>
  <div className="card-body chart-body">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 20, bottom: 5 }}> {/* ⬇️ Slightly increased bottom spacing */}
        <Pie
          data={categoryData.filter((entry) => !entry.hidden)} // hide filtered slices
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"          // ✅ keep pie centered at original level
          outerRadius={95}
          labelLine={false}
          label={false}
        >
          {categoryData
            .filter((entry) => !entry.hidden)
            .map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
                style={{ transition: "transform 0.3s ease" }}
              />
            ))}
        </Pie>

        {/* ✅ Tooltip - white text on dark background */}
        <Tooltip
          formatter={(value, name) => [`${value}`, `Category: ${name}`]}
          contentStyle={{
            background: "rgba(20, 25, 35, 0.9)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
          itemStyle={{
            color: "#fff",
            fontSize: "13px",
          }}
          labelStyle={{
            color: "#cfe3ff",
            fontWeight: 500,
          }}
        />

        {/* ✅ Interactive Legend (labels moved slightly lower) */}
        <Legend
          verticalAlign="bottom"
          align="center"
          layout="horizontal"
          iconType="circle"
          wrapperStyle={{
            fontSize: "13px",
            color: "#e0ecff",
            marginTop: "35px", // ⬇️ moved legend lower
            cursor: "pointer",
          }}
          onClick={(e) => {
            const name = e.value;
            const updated = categoryData.map((entry) =>
              entry.name === name ? { ...entry, hidden: !entry.hidden } : entry
            );
            setCategoryData(updated);
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>


        {/* 3) INVENTORY - AREA (uses available_stock) */}
        <div className="card chart-card">
          <div className="card-header">
            <h5>📈 Inventory Levels (available_stock)</h5>
          </div>
          <div className="card-body chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inventoryData}>
                <XAxis dataKey="name" tick={{ fill: "#cfe3ff", fontSize: 12 }} />
                <YAxis tick={{ fill: "#cfe3ff" }} />
                <Tooltip formatter={inventoryTooltipFormatter} />
                <Area type="monotone" dataKey="stock" stroke={COLORS[2]} fill="rgba(124,58,237,0.22)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4) ALERT TREND - LINE */}
        <div className="card chart-card">
          <div className="card-header">
            <h5>⚠️ Alerts Trend</h5>
          </div>
          <div className="card-body chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertTrend}>
                <XAxis dataKey="date" tick={{ fill: "#cfe3ff", fontSize: 12 }} />
                <YAxis tick={{ fill: "#cfe3ff" }} />
                <Tooltip formatter={alertsTooltipFormatter} />
                <Line type="monotone" dataKey="alerts" stroke={COLORS[4]} strokeWidth={3} dot={{ r: 4 }} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
