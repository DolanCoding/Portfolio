const fs = require("fs");
const path = require("path");

populateTables = async (db, tables) => {
  console.log("****_____----------------_____****");
  console.log("Populating tables with default data...");

  for (const tableInfo of tables) {
    const name = tableInfo.name;
    const tableCountRow = await db.get(`SELECT COUNT(*) as count FROM ${name}`);
    const tableCount = tableCountRow.count;

    if (tableCount === 0) {
      console.log(`Table ${name} was empty, Populating...`);
      const columns = tableInfo.columns;
      const jsonFilePath = `./db/Data/init_pop/${name}.json`;
      const data = fs.readFileSync(jsonFilePath, "utf8");
      const jsonData = JSON.parse(data);

      if (jsonData.length > 0) {
        const insertSql = `INSERT INTO ${name} (${columns
          .map((col) => col.name)
          .join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`;
        for (const row of jsonData) {
          const values = columns.map((col) => {
            if (Array.isArray(row[col.name])) {
              row[col.name] = JSON.stringify(row[col.name]);
            }
            return row[col.name];
          });
          await db.run(insertSql, values);
        }
        console.log(`Inserted ${jsonData.length} rows into ${name} table.`);
      } else {
        console.log(`No data found in ${jsonFilePath}.`);
      }
    } else {
      console.log(`Table ${name} already has data, skipping...`);
    }
  }
};

module.exports = populateTables;
