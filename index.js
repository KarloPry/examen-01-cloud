const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());
app.get("/api/users", (req, res) => {
  const connection = mysql.createConnection({
    host: "mysql.db-karlo.svc.cluster.local",
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "password",
  });
  //Query to create database
  connection.query(
    "CREATE DATABASE IF NOT EXISTS test",
    function (err, result) {
      if (err) throw err;
      console.log("Database created");
    }
  );
  //Query to create table
  connection.query("USE test", function (err, result) {
    if (err) throw err;
    console.log("Database selected");
  });
  connection.query(
    "CREATE TABLE IF NOT EXISTS test (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))",
    function (err, result) {
      if (err) throw err;
      console.log("Table created");
    }
  );
  //Query to insert data
  connection.query("SELECT * FROM test", function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  connection.end();
});
app.post("/api/users", (req, res) => {
  const connection = mysql.createConnection({
    host: "mysql.db-karlo.svc.cluster.local",
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "password",
  });
  connection.query("USE test", function (err, result) {
    if (err) throw err;
    console.log("Database selected");
  });
  connection.query(
    `INSERT INTO test (name) VALUES ('${req.body.name}')`,
    function (err, result) {
      if (err) throw err;
      res.status(200).send("Data inserted");
    }
  );
  connection.end();
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
