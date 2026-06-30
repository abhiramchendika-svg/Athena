 const { getDB } = require("./database");

async function saveMemory(key, value) {
  const db = getDB();

  await db.run(
    `
    INSERT INTO memories (key, value)
    VALUES (?, ?)
    ON CONFLICT(key)
    DO UPDATE SET
      value = excluded.value,
      updatedAt = CURRENT_TIMESTAMP
    `,
    [key, value]
  );
}

async function getMemory(key) {
  const db = getDB();

  return await db.get(
    "SELECT value FROM memories WHERE key = ?",
    [key]
  );
}

async function getAllMemories() {
  const db = getDB();

  return await db.all(
    "SELECT * FROM memories"
  );
}

module.exports = {
  saveMemory,
  getMemory,
  getAllMemories,
};