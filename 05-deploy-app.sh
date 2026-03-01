#!/bin/bash
# ============================================================
# STEP 5: Deploy the Bookstore App
# Creates files locally, SCPs them to GCE, then runs setup via SSH
# ============================================================

set -e

INSTANCE_NAME="bookstore-server"
ZONE="us-central1-a"
DB_PRIVATE_IP="${1:-10.100.0.2}"

echo "═══════════════════════════════════════════"
echo "  Step 5: Deploy Bookstore Application"
echo "═══════════════════════════════════════════"
echo ""
echo "  Using DB IP: $DB_PRIVATE_IP"
echo "  (pass as argument if different: ./05-deploy-app.sh 10.x.x.x)"
echo ""

# ─── Create local staging directory ───
STAGING=$(mktemp -d)
trap "rm -rf $STAGING" EXIT

echo "→ Preparing app files locally..."

mkdir -p "$STAGING/bookstore-api/routes"
mkdir -p "$STAGING/bookstore-api/middleware"
mkdir -p "$STAGING/bookstore-frontend/build"

# ══════════════════════════════════════
#  BACKEND: Express API
# ══════════════════════════════════════

# package.json
cat > "$STAGING/bookstore-api/package.json" << 'PKG'
{
  "name": "bookstore-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  }
}
PKG

# .env file
cat > "$STAGING/bookstore-api/.env" << ENV
DB_HOST=$DB_PRIVATE_IP
DB_USER=bookstore_app
DB_PASSWORD=ChangeMe_Str0ng!Pass
DB_NAME=bookstore
DB_PORT=3306
JWT_SECRET=change-this-to-a-random-string-$(openssl rand -hex 16)
PORT=8080
ENV

# db.js
cat > "$STAGING/bookstore-api/db.js" << 'DBJS'
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
DBJS

# server.js
cat > "$STAGING/bookstore-api/server.js" << 'SERVERJS'
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/orders", require("./routes/orders"));

// Health check
app.get("/api/health", async (req, res) => {
  const db = require("./db");
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", database: "disconnected", error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
SERVERJS

# Auth middleware
cat > "$STAGING/bookstore-api/middleware/auth.js" << 'AUTHM'
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
AUTHM

# Auth routes
cat > "$STAGING/bookstore-api/routes/auth.js" << 'AUTHR'
const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
      [email, name, hash]
    );
    res.status(201).json({ id: result.insertId, email, name });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ error: "Email already exists" });
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: rows[0].id, email: rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token, user: { id: rows[0].id, email: rows[0].email, name: rows[0].name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
AUTHR

# Books routes
cat > "$STAGING/bookstore-api/routes/books.js" << 'BOOKSR'
const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    let sql = "SELECT * FROM books WHERE 1=1";
    const params = [];

    if (search) {
      sql += " AND (title LIKE ? OR author LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }
    sql += " ORDER BY created_at DESC";

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Book not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author, isbn, price, stock, category, description } = req.body;
    const [result] = await db.query(
      "INSERT INTO books (title, author, isbn, price, stock, category, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, author, isbn, price, stock, category, description]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, author, isbn, price, stock, category, description } = req.body;
    await db.query(
      "UPDATE books SET title=?, author=?, isbn=?, price=?, stock=?, category=?, description=? WHERE id=?",
      [title, author, isbn, price, stock, category, description, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM books WHERE id = ?", [req.params.id]);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
BOOKSR

# Orders routes
cat > "$STAGING/bookstore-api/routes/orders.js" << 'ORDERSR'
const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const [orders] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    for (const order of orders) {
      const [items] = await db.query(
        `SELECT oi.*, b.title, b.author
         FROM order_items oi JOIN books b ON oi.book_id = b.id
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items;
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  const conn = await require("../db").getConnection();
  try {
    await conn.beginTransaction();
    const { items } = req.body; // [{ book_id, quantity }]
    let total = 0;

    // Calculate total and verify stock
    for (const item of items) {
      const [books] = await conn.query("SELECT price, stock FROM books WHERE id = ?", [item.book_id]);
      if (!books.length) throw new Error(`Book ${item.book_id} not found`);
      if (books[0].stock < item.quantity) throw new Error(`Insufficient stock for book ${item.book_id}`);
      item.unit_price = books[0].price;
      total += books[0].price * item.quantity;
    }

    // Create order
    const [order] = await conn.query(
      "INSERT INTO orders (user_id, total, status) VALUES (?, ?, 'confirmed')",
      [req.user.id, total]
    );

    // Create line items & reduce stock
    for (const item of items) {
      await conn.query(
        "INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
        [order.insertId, item.book_id, item.quantity, item.unit_price]
      );
      await conn.query(
        "UPDATE books SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.book_id]
      );
    }

    await conn.commit();
    res.status(201).json({ id: order.insertId, total, status: "confirmed" });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

module.exports = router;
ORDERSR

# Schema + seed data
cat > "$STAGING/bookstore-api/schema.sql" << 'SCHEMA'
CREATE TABLE IF NOT EXISTS users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(100) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    author      VARCHAR(150) NOT NULL,
    isbn        VARCHAR(13) UNIQUE,
    price       DECIMAL(10,2) NOT NULL,
    stock       INT DEFAULT 0,
    category    VARCHAR(50),
    description TEXT,
    cover_url   VARCHAR(500),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    total       DECIMAL(10,2) NOT NULL,
    status      ENUM('pending','confirmed','shipped','delivered') DEFAULT 'pending',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    order_id    INT NOT NULL,
    book_id     INT NOT NULL,
    quantity    INT NOT NULL,
    unit_price  DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (book_id)  REFERENCES books(id)
);

-- Seed some books
INSERT IGNORE INTO books (title, author, isbn, price, stock, category, description) VALUES
('The Pragmatic Programmer', 'David Thomas & Andrew Hunt', '9780135957059', 49.99, 12, 'Technology', 'A classic guide to software craftsmanship.'),
('Dune', 'Frank Herbert', '9780441013593', 16.99, 25, 'Sci-Fi', 'Set on the desert planet Arrakis, an epic tale of politics and ecology.'),
('Thinking, Fast and Slow', 'Daniel Kahneman', '9780374533557', 18.99, 8, 'Psychology', 'Explores the two systems that drive the way we think.'),
('Clean Code', 'Robert C. Martin', '9780132350884', 42.99, 15, 'Technology', 'A handbook of agile software craftsmanship.'),
('Sapiens', 'Yuval Noah Harari', '9780062316097', 22.99, 30, 'History', 'A brief history of humankind.'),
('Project Hail Mary', 'Andy Weir', '9780593135204', 14.99, 20, 'Sci-Fi', 'A lone astronaut must save Earth from an extinction-level threat.');
SCHEMA

# Nginx config
cat > "$STAGING/nginx-bookstore.conf" << 'NGINX'
server {
    listen 80;
    server_name _;

    # Frontend (static files)
    location / {
        root /home/USER_PLACEHOLDER/bookstore-frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

# Placeholder index.html for frontend
cat > "$STAGING/bookstore-frontend/build/index.html" << 'HTML'
<!DOCTYPE html>
<html><head><title>Shelved Bookstore</title></head>
<body><h1>Shelved Bookstore</h1><p>Frontend coming soon. API is live at <a href="/api/health">/api/health</a></p></body>
</html>
HTML

echo "✓ Files staged locally"

# ─── SCP files to VM ───
echo "→ Copying files to GCE instance..."
gcloud compute scp --recurse "$STAGING/bookstore-api" "$STAGING/bookstore-frontend" "$STAGING/nginx-bookstore.conf" \
  $INSTANCE_NAME:~/ --zone=$ZONE

echo "✓ Files copied to VM"

# ─── SSH in and run setup ───
echo "→ Running setup on VM..."
gcloud compute ssh $INSTANCE_NAME --zone=$ZONE --command="
set -e
cd ~

# Install dependencies
echo '→ Installing Node.js dependencies...'
cd bookstore-api && npm install && cd ..

# Run schema
echo '→ Running database schema...'
mysql -h '$DB_PRIVATE_IP' -u bookstore_app -p'ChangeMe_Str0ng!Pass' bookstore < bookstore-api/schema.sql 2>/dev/null || \
  echo '  → Could not auto-run schema. Run manually after installing mysql-client.'

# Configure Nginx
echo '→ Configuring Nginx...'
sudo cp nginx-bookstore.conf /etc/nginx/sites-available/bookstore
sudo sed -i \"s/USER_PLACEHOLDER/\$USER/\" /etc/nginx/sites-available/bookstore
sudo ln -sf /etc/nginx/sites-available/bookstore /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Start API with PM2
echo '→ Starting API with PM2...'
cd bookstore-api
pm2 start server.js --name bookstore-api
pm2 save
pm2 startup systemd -u \$USER --hp /home/\$USER 2>/dev/null || true
cd ..

echo ''
echo '✓ Bookstore API is running on port 8080'
echo '✓ Nginx proxy is serving on port 80'
"

# ─── Get external IP ───
EXTERNAL_IP=$(gcloud compute instances describe $INSTANCE_NAME \
  --zone=$ZONE \
  --format="value(networkInterfaces[0].accessConfigs[0].natIP)")

echo ""
echo "═══════════════════════════════════════════"
echo "  ✓ Deployment complete!"
echo "═══════════════════════════════════════════"
echo ""
echo "  App URL:     http://$EXTERNAL_IP"
echo "  Health:      http://$EXTERNAL_IP/api/health"
echo "  API Base:    http://$EXTERNAL_IP/api"
echo ""
echo "  SSH into VM: gcloud compute ssh $INSTANCE_NAME --zone=$ZONE"
echo "  View logs:   pm2 logs bookstore-api"
echo ""
echo "Next: Run 06-seed-and-test.sh to verify everything works"
