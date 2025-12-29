import { useEffect, useState } from "react";
import "./Topbar.css";
import { motion } from "framer-motion";
import { FaUserCircle, FaBell, FaClock } from "react-icons/fa";

export default function Topbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      setTime(formatted);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="topbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="left">
        <h2 className="app-title">📦 IMS – Inventory ERP</h2>
      </div>

      <div className="right">
        <div className="top-info">
          <FaClock className="icon" />
          <span>{time}</span>
        </div>

        <div className="top-info">
          <FaBell className="icon" />
        </div>

        <div className="top-info user">
          <FaUserCircle className="icon user-icon" />
          <span>Aditi</span>
        </div>
      </div>
    </motion.div>
  );
}
