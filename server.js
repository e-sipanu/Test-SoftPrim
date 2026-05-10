const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); //
app.use(express.json());

// Conexiunea la MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'softprim_test'
});

// 4.1. GET /api/categories
app.get('/api/categories', (req, res) => {
    const query = "SELECT id, name, slug FROM categories ORDER BY name ASC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 4.2. GET /api/products
app.get('/api/products', (req, res) => {
    const categoryId = req.query.category_id;
    let query = `
        SELECT p.id, p.name, p.price, p.stock, p.category_id, c.name as category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
    `;
    let queryParams = [];

    // Validare category_id
    if (categoryId !== undefined) {
        const id = parseInt(categoryId);
        if (isNaN(id) || id < 0) {
            return res.status(400).json({ error: "Invalid category_id" });
        }
        query += " WHERE p.category_id = ?";
        queryParams.push(id);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));