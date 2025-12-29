import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";   // ✅ NEW TOPBAR
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Batches from "./components/Batches";
import Inventory from "./components/Inventory";
import Alerts from "./components/Alerts";

export default function App() {
  const [active, setActive] = useState("dashboard");

  const renderMain = () => {
    switch (active) {
      case "products": return <Products />;
      case "batches": return <Batches />;
      case "inventory": return <Inventory />;
      case "alerts": return <Alerts />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} />
      <div className="main">
        <div className="topbar">
          <div className="title">
            <h1>Warehouse Inventory Management</h1>
            <div className="small-muted">Real-time dashboard </div>
          </div>
          <div className="controls">
            <button className="btn btn-sm btn-ghost" onClick={() => window.location.reload()}>Refresh</button>
          </div>
        </div>

        {renderMain()}
      </div>
    </div>
  );
}


