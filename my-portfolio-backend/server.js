// File: server.js
// This is the main server file for the portfolio application backend.
// It sets up an Express server, connects to a SQLite database, and defines API routes.
// It also initializes the database with some sample data if it doesn't already exist.

const express = require("express");
const cors = require("cors");
const sqlite = require("sqlite"); // Import sqlite
const sqlite3 = require("sqlite3"); // Import sqlite3 driver
const path = require("path"); // Import path module to handle file paths
const { initializeDatabase } = require("./db/init_db"); // Import the database initialization script

const app = express();
const port = process.env.PORT || 3001;
// Define the path to the database file

let db; // Variable to hold the database connection instance

// --- Async function to open the database connection ---
async function openDatabase() {
  // Initialize the database (create tables, etc.)
  await initializeDatabase(); // Call the function to initialize the database
  const DATABASE_PATH = path.resolve(__dirname, "./db/portfolio.db");
  try {
    // Open the database connection
    db = await sqlite.open({
      filename: DATABASE_PATH,
      driver: sqlite3.Database,
    });
    // You can perform initial checks or setup here if needed
  } catch (e) {
    console.error("Error opening database:", e);
    process.exit(1); // Exit the process if database connection fails
  }
}

// --- Middleware ---
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Optional: if you plan to receive JSON data
app.use(
  "/images",
  express.static(path.join(__dirname, "db", "Data", "images", "project_images"))
);

// --- API Routes ---

// Route to get all projects from the database
app.get("/api/projects", async (req, res) => {
  console.log("Received request for projects");
  try {
    // Query the database for all projects
    // db.all() executes a SELECT query and returns all results as an array of objects
    const projects = await db.all("SELECT * FROM projects");

    // Send the projects data as a JSON response
    res.json(projects);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" }); // Send a 500 error response
  }
});

app.post("/api/admin_login", async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  console.log("Username:", username);
  console.log("Password:", password);
  try {
    // Query the database for the user with the given username and password
    const user = await db.get(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    console.log("User found:", user);
    if (user) {
      // If a user is found, send a success response
      res.json({ message: "Login successful", user });
    } else {
      // If no user is found, send an error response
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" }); // Send a 500 error response
  }
});

// Create HTTPS server

async function startServer() {
  await openDatabase(); // Öffne die Datenbank
  app.listen(port, () => {
    // Starte den HTTP-Server
    console.log(`Server listening on port ${port}`);
    console.log("----------------------------------------------");
    console.log("----------------------------------------------");
  });
}
startServer();
// Call the async function to start the server
