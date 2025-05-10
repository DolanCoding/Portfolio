// File: init_db.js
// This script initializes the SQLite database for the portfolio application.
// It creates the necessary tables and inserts initial data if they don't already exist.

const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const schema = require("./db_schema"); // Import the schema from db_schema.js
const populateTables = require("./db_temp_pop"); // Import the function to populate tables
// Define the name of our database file
const DATABASE = "./db/portfolio.db";

// --- Database Initialization ---
async function initializeDatabase() {
  let db;
  console.log("Schema loaded:", schema.tables);
  try {
    db = await sqlite.open({ filename: DATABASE, driver: sqlite3.Database });
    console.log(`Database ${DATABASE} opened successfully.`); // --- Create tables ---

    // CORRECTED loop to iterate over the 'tables' array
    for (const tableInfo of schema["tables"]) {
      // <-- Changed from "tables" string to the tables array
      const createTableSql = `
        CREATE TABLE IF NOT EXISTS ${tableInfo.name} (
          ${tableInfo.columns
            .map((col) => `${col.name} ${col.type}`)
            .join(", ")}
        )
      `;
      await db.exec(createTableSql);
      console.log(`${tableInfo.name} table created or already exists.`);
    }

    // --- Add a default admin user if the users table is empty (keep this part) ---
    await populateTables(db, schema.tables)
  } catch (e) {
    console.error("An error occurred during database initialization:", e);
    // Consider exiting or throwing the error in a real application
  } finally {
    // ... (rest of the finally block) ...
  }
}

// ... (rest of your init_db.js file)

// Run the initialization function when the script is executed directly
module.exports = {
  initializeDatabase,
};
