-- ============================================================
-- INVENTORY MANAGEMENT SYSTEM (COMPILED SCRIPT)
-- ALL TABLE NAMES UPDATED WITH _new
-- MySQL Compatible | Run in ONE GO
-- ============================================================

DROP DATABASE IF EXISTS inventory_management;
CREATE DATABASE inventory_management;
USE inventory_management;

-- ============================================================
-- 1. MASTER TABLES
-- ============================================================

CREATE TABLE product_new (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    unit VARCHAR(50),
    category VARCHAR(50),
    description TEXT,
    unit_price DECIMAL(10,2) DEFAULT 0,
    quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 10
);

CREATE TABLE supplier_new (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(50),
    contact_info VARCHAR(100)
);

CREATE TABLE shelf_new (
    shelf_id INT AUTO_INCREMENT PRIMARY KEY,
    shelf_code VARCHAR(20) UNIQUE,
    location_description VARCHAR(100)
);

CREATE TABLE customer_new (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(50),
    email VARCHAR(100)
);

-- ============================================================
-- 2. TRANSACTION TABLES
-- ============================================================

CREATE TABLE batch_new (
    batch_id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    mfg_date DATE,
    expiry_date DATE,
    received_date DATE,
    batch_quantity INT,
    product_id INT,
    shelf_id INT,
    FOREIGN KEY (product_id) REFERENCES product_new(product_id),
    FOREIGN KEY (shelf_id) REFERENCES shelf_new(shelf_id)
);

CREATE TABLE inventory_new (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    batch_id INT,
    shelf_id INT,
    available_stock INT,
    warehouse_zone VARCHAR(10) DEFAULT 'A1',
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES batch_new(batch_id),
    FOREIGN KEY (shelf_id) REFERENCES shelf_new(shelf_id)
);

CREATE TABLE reorder_alert_new (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    alert_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    message VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES product_new(product_id)
);

CREATE TABLE orders_new (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customer_new(customer_id)
);

CREATE TABLE order_details_new (
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders_new(order_id),
    FOREIGN KEY (product_id) REFERENCES product_new(product_id)
);

CREATE TABLE inventory_audit_new (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    batch_id INT,
    change_type VARCHAR(30),
    changed_on DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3. SAMPLE DATA
-- ============================================================

INSERT INTO product_new (product_name, unit, category, description, unit_price)
VALUES
('LED Bulb 10W','Pieces','Electrical','LED bulb',120),
('Ceiling Fan','Pieces','Electrical','Ceiling fan',2200),
('Washing Powder','Packets','Household','Detergent',95);

INSERT INTO shelf_new (shelf_code, location_description)
VALUES
('A1','Zone A Top'),
('A2','Zone A Middle'),
('B1','Zone B Top');

INSERT INTO batch_new (quantity, product_id, shelf_id)
VALUES
(500,1,1),
(300,2,2),
(90,3,3);

INSERT INTO inventory_new (batch_id, shelf_id, available_stock)
VALUES
(1,1,480),
(2,2,290),
(3,3,85);

INSERT INTO reorder_alert_new (product_id, message)
VALUES
(3,'Stock below reorder level');

-- ============================================================
-- 4. DML OPERATIONS
-- ============================================================

UPDATE inventory_new
SET available_stock = available_stock - 20
WHERE batch_id = 3;

INSERT INTO inventory_audit_new (batch_id, change_type)
VALUES (3,'Stock Updated');

-- ============================================================
-- 5. JOINS
-- ============================================================

SELECT p.product_name, i.available_stock
FROM product_new p
JOIN batch_new b ON p.product_id = b.product_id
JOIN inventory_new i ON b.batch_id = i.batch_id;

-- ============================================================
-- 6. SUBQUERIES
-- ============================================================

SELECT batch_id, available_stock
FROM inventory_new
WHERE available_stock < (SELECT AVG(available_stock) FROM inventory_new);

-- ============================================================
-- 7. BUILT-IN FUNCTIONS
-- ============================================================

SELECT 
    COUNT(*) AS total_batches,
    SUM(available_stock) AS total_stock,
    AVG(available_stock) AS avg_stock
FROM inventory_new;

SELECT batch_id, available_stock,
CASE
    WHEN available_stock > 300 THEN 'High Stock'
    WHEN available_stock BETWEEN 100 AND 300 THEN 'Medium Stock'
    ELSE 'Low Stock'
END AS stock_status
FROM inventory_new;

-- ============================================================
-- 8. VIEW
-- ============================================================

CREATE VIEW low_stock_items_new AS
SELECT batch_id, available_stock
FROM inventory_new
WHERE available_stock < 100;

-- ============================================================
-- 9. TRANSACTION
-- ============================================================

START TRANSACTION;

UPDATE inventory_new
SET available_stock = available_stock - 10
WHERE batch_id = 1;

INSERT INTO inventory_audit_new (batch_id, change_type)
VALUES (1,'Dispatch');

COMMIT;

-- ============================================================
-- 10. FINAL CHECK
-- ============================================================

SHOW TABLES;
SELECT * FROM low_stock_items_new;

-- ============================================================
-- END OF SCRIPT
-- ============================================================
