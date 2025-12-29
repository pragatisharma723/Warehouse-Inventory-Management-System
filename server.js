// ============================================================
// ✅ INVENTORY MANAGEMENT BACKEND (FINAL — FULLY FIXED)
// ============================================================

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password@sql7",
  database: "inventory_management",
});

db.connect((err) => {
  if (err) console.log("❌ DB Error:", err);
  else console.log("✅ Connected to MySQL");
});

// ============================================================
// ✅ Utility → Auto-create reorder alert
// ============================================================
function checkLowStock(product_id, product_name, qty, reorder_level) {
  if (qty < reorder_level) {
    const msg = `⚠️ Low Stock for ${product_name}. Quantity: ${qty}`;
    db.query(
      "INSERT INTO reorder_alert (product_id, message) VALUES (?, ?)",
      [product_id, msg]
    );
  }
}

// ============================================================
// ✅ PRODUCT ROUTES
// ============================================================

// ✅ Get all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM product ORDER BY product_id ASC", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ✅ Add product → auto create batch → auto inventory → check reorder
app.post("/products", (req, res) => {
  const { product_name, unit, category, description, quantity, reorder_level } =
    req.body;

  const sql =
    "INSERT INTO product (product_name, unit, category, description, quantity, reorder_level) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [product_name, unit, category, description, quantity, reorder_level],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const product_id = result.insertId;

      // ✅ Create batch
      const batchSql = `
        INSERT INTO batch (quantity, mfg_date, expiry_date, received_date, product_id, shelf_id)
        VALUES (?, CURDATE(), CURDATE(), CURDATE(), ?, 1)
      `;

      db.query(batchSql, [quantity, product_id], (err2, result2) => {
        if (err2) return res.status(500).json(err2);

        const batch_id = result2.insertId;

        // ✅ Create inventory record
        const invSql = `
          INSERT INTO inventory (batch_id, shelf_id, product_id, available_stock)
          VALUES (?, 1, ?, ?)
        `;

        db.query(invSql, [batch_id, product_id, quantity]);

        // ✅ Auto reorder alert
        checkLowStock(product_id, product_name, quantity, reorder_level);

        res.json({
          message: "✅ Product + Batch + Inventory Added",
          product_id,
          batch_id,
        });
      });
    }
  );
});

// ✅ Delete product
app.delete("/products/:id", (req, res) => {
  db.query(
    "DELETE FROM product WHERE product_id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "🗑️ Product deleted" });
    }
  );
});

// ============================================================
// ✅ BATCH ROUTES
// ============================================================

app.get("/batches", (req, res) => {
  const sql = `
    SELECT b.batch_id, b.quantity AS batch_quantity,
           p.product_name, s.shelf_code
    FROM batch b
    LEFT JOIN product p ON b.product_id = p.product_id
    LEFT JOIN shelf s ON b.shelf_id = s.shelf_id
    ORDER BY batch_id ASC
  `;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ============================================================
// ✅ INVENTORY ROUTES (FULLY FIXED)
// ============================================================

// ✅ Get inventory list
app.get("/inventory", (req, res) => {
  const sql = `
    SELECT 
      i.batch_id, 
      i.shelf_id, 
      i.product_id,
      i.available_stock, 
      i.last_updated, 
      i.warehouse_zone,
      p.product_name, 
      p.reorder_level,     -- ✅ ADDED
      s.shelf_code
    FROM inventory i
    LEFT JOIN product p ON i.product_id = p.product_id
    LEFT JOIN shelf s ON i.shelf_id = s.shelf_id
    ORDER BY batch_id ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});


// ✅ FIXED INSERT → Automatically fetch product_id
app.post("/inventory", (req, res) => {
  const { batch_id, shelf_id, available_stock } = req.body;

  if (!batch_id || !shelf_id || available_stock == null) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // ✅ Get product_id from batch table
  db.query(
    "SELECT product_id FROM batch WHERE batch_id = ?",
    [batch_id],
    (err, rows) => {
      if (err || rows.length === 0)
        return res.status(500).json({ error: "Invalid batch_id" });

      const product_id = rows[0].product_id;

      // ✅ Insert final inventory row
      const sql = `
        INSERT INTO inventory (batch_id, shelf_id, product_id, available_stock)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        sql,
        [batch_id, shelf_id, product_id, available_stock],
        (err2, result) => {
          if (err2) return res.status(500).json(err2);

          res.json({
            message: "✅ Inventory Added Successfully",
            id: result.insertId,
          });
        }
      );
    }
  );
});

// ✅ Update inventory
app.put("/inventory/:batch_id", (req, res) => {
  const { available_stock } = req.body;

  db.query(
    "UPDATE inventory SET available_stock = ? WHERE batch_id = ?",
    [available_stock, req.params.batch_id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "✅ Inventory Updated" });
    }
  );
});

// ============================================================
// ✅ ALERTS ROUTES
// ============================================================

app.get("/alerts", (req, res) => {
  db.query("SELECT * FROM reorder_alert ORDER BY alert_id DESC", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// ============================================================
// ✅ DASHBOARD SUMMARY
// ============================================================

app.get("/dashboard/summary", (req, res) => {
  const queries = {
    products: "SELECT COUNT(*) AS total FROM product",
    batches: "SELECT COUNT(*) AS total FROM batch",
    alerts: "SELECT COUNT(*) AS total FROM reorder_alert",
    inventory: "SELECT COUNT(*) AS total FROM inventory",
  };

  const keys = Object.keys(queries);
  const promises = keys.map(
    (k) =>
      new Promise((resolve, reject) => {
        db.query(queries[k], (err, rows) => {
          if (err) reject(err);
          else resolve({ k, total: rows[0].total });
        });
      })
  );

  Promise.all(promises)
    .then((r) => {
      const out = {};
      r.forEach((o) => (out[o.k] = o.total));
      res.json(out);
    })
    .catch((err) => res.status(500).json(err));
});

// ============================================================
// ✅ START SERVER
// ============================================================

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
