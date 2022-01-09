const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");
const bodyParser = require("body-parser");

// JSON Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database configs
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restful_db",
});

// Connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("Database connection succeed!");
});

// Show all product
app.get("/api/product", (req, res) => {
  let sql = `SELECT * FROM product`;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: results,
      })
    );
  });
});

// Show one specific product
app.get("/api/product/:id", (req, res) => {
  let sql = `SELECT * FROM product WHERE id_product=${req.params.id}`;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: results,
      })
    );
  });
});

// Add new product
app.post("/api/product", (req, res) => {
  let data = {
    name: req.body.name,
    price: req.body.price,
  };
  let sql = `INSERT INTO product SET ?`;
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: results,
      })
    );
  });
});

// Update a specific product
app.put("/api/product/:id", (req, res) => {
  let sql = `UPDATE product SET name = '${req.body.name}', price = '${req.body.price}' WHERE id_product = ${req.params.id}`;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: results,
      })
    );
  });
});

// Delete a specific product
app.delete("/api/product/:id", (req, res) => {
  let sql = `DELETE FROM product WHERE id_product = ${req.params.id}`;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: results,
      })
    );
  });
});

app.listen(port, () => {
  console.log(`REST API of Product is listening at http://localhost:${port}`);
});
