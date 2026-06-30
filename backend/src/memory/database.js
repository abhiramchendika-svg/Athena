const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db;

async function initDatabase() {
  db = await open({
    filename: "./athena.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE,
      value TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Athena Memory Database Ready");
}

function getDB() {
  return db;
}

module.exports = {
  initDatabase,
  getDB,
};