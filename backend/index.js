require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

// Environment variables
const port = process.env.PORT || 3001;
const dbPath = path.join(__dirname, process.env.DB_PATH || "salesDatabase.db");

// Database connection
let db;

// Initialize the database and server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// Root route
app.get("/", (req, res) => {
  res.send("Backend Server is running!");
});

// Fetch sales data
app.get("/sales", async (request, response) => {
  try {
    const { month = 1, search_q = "", page = 1 } = request.query;

    const query = `
      SELECT * FROM salesData
      WHERE CAST(strftime('%m', dateOfSale) AS INTEGER) = ? AND
      (title LIKE ? OR price LIKE ? OR description LIKE ?)
      LIMIT 10 OFFSET ?
    `;

    const result = await db.all(query, [
      month,
      `%${search_q}%`,
      `%${search_q}%`,
      `%${search_q}%`,
      (page - 1) * 10,
    ]);
    response.status(200).json(result);
  } catch (error) {
    console.error("Error fetching sales data:", error.message);
    response.status(500).json({ error: "An error occurred while fetching sales data." });
  }
});

// Fetch sales statistics
app.get("/statistics", async (request, response) => {
  try {
    const { month = 1 } = request.query;
    const query = `
      SELECT 
        SUM(CASE WHEN sold = TRUE THEN price END) AS sales,
        COUNT(CASE WHEN sold = TRUE THEN price END) AS soldItems,
        COUNT(CASE WHEN sold <> TRUE THEN price END) AS unSoldItems
      FROM salesData
      WHERE CAST(strftime('%m', dateOfSale) AS INT) = ?
    `;

    const result = await db.get(query, [month]);
    response.status(200).json(result);
  } catch (error) {
    console.error("Error fetching statistics:", error.message);
    response.status(500).json({ error: "An error occurred while fetching statistics." });
  }
});

// Fetch item price ranges
app.get("/items", async (request, response) => {
  try {
    const { month } = request.query;

    const query = `
      SELECT 
        COUNT(CASE WHEN price BETWEEN 0 AND 100 THEN 1 END) AS '0-100',
        COUNT(CASE WHEN price BETWEEN 101 AND 200 THEN 1 END) AS '101-200',
        COUNT(CASE WHEN price BETWEEN 201 AND 300 THEN 1 END) AS '201-300',
        COUNT(CASE WHEN price BETWEEN 301 AND 400 THEN 1 END) AS '301-400',
        COUNT(CASE WHEN price BETWEEN 401 AND 500 THEN 1 END) AS '401-500',
        COUNT(CASE WHEN price BETWEEN 501 AND 600 THEN 1 END) AS '501-600',
        COUNT(CASE WHEN price BETWEEN 601 AND 700 THEN 1 END) AS '601-700',
        COUNT(CASE WHEN price BETWEEN 701 AND 800 THEN 1 END) AS '701-800',
        COUNT(CASE WHEN price BETWEEN 801 AND 900 THEN 1 END) AS '801-900',
        COUNT(CASE WHEN price >= 901 THEN 1 END) AS '901-above'
      FROM salesData
      WHERE CAST(strftime('%m', dateOfSale) AS INT) = ?
    `;

    const result = await db.get(query, [month]);
    response.status(200).json(result);
  } catch (error) {
    console.error("Error fetching item price ranges:", error.message);
    response.status(500).json({ error: "An error occurred while fetching item price ranges." });
  }
});

// Fetch category-wise item counts
app.get("/categories", async (request, response) => {
  try {
    const { month = 1 } = request.query;

    const query = `
      SELECT 
        category, COUNT(category) AS items
      FROM salesData
      WHERE CAST(strftime('%m', dateOfSale) AS INT) = ?
      GROUP BY category
    `;

    const result = await db.all(query, [month]);
    response.status(200).json(result);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    response.status(500).json({ error: "An error occurred while fetching categories." });
  }
});

// Fetch combined statistics
const monthsData = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

app.get("/all-statistics", async (request, response) => {
  try {
    const { month = 3 } = request.query;

    const baseApiUrl = process.env.THIRD_PARTY_API_BASE_URL || "https://backendof.onrender.com";
    const api1Response = await fetch(`${baseApiUrl}/statistics?month=${month}`);
    const api1Data = await api1Response.json();

    const api2Response = await fetch(`${baseApiUrl}/items?month=${month}`);
    const api2Data = await api2Response.json();

    const api3Response = await fetch(`${baseApiUrl}/categories?month=${month}`);
    const api3Data = await api3Response.json();

    response.status(200).json({
      monthName: monthsData[month],
      statistics: api1Data,
      itemPriceRange: api2Data,
      categories: api3Data,
    });
  } catch (error) {
    console.error("Error fetching all statistics:", error.message);
    response.status(500).json({ error: "An error occurred while fetching all statistics." });
  }
});
