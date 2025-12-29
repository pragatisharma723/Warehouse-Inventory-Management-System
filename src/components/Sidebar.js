import React from "react";

export default function Sidebar({ active, setActive }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "batches", label: "Batches", icon: "🧾" },
    { id: "inventory", label: "Inventory", icon: "📋" },
    { id: "alerts", label: "Alerts", icon: "⚠️" }
  ];

  return (
    <div className="sidebar" title="Inventory Menu">
      <div className="brand">
        <div className="logo">IM</div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <strong style={{color:"#fff",fontSize:14}}>IMS</strong>
          <small className="small-muted">v1.0</small>
        </div>
      </div>

      <div className="nav">
        {items.map(it => (
          <div key={it.id}
               className="nav-item"
               onClick={() => setActive(it.id)}
               style={{ background: active === it.id ? "linear-gradient(90deg, rgba(96,165,250,0.12), rgba(56,189,248,0.06))" : "transparent" }}>
            <div className="icon-box">{it.icon}</div>
            <div className="label">{it.label}</div>
          </div>
        ))}
      </div>

      <div className="foot">
        <small className="small-muted">Logged in as <strong>Aditi</strong></small>
      </div>
    </div>
  );
}

