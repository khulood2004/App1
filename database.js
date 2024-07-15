// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('contacts.db');

// Crear la tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    number TEXT NOT NULL,
    email TEXT NOT NULL,
    group_name TEXT
  )`);
});

module.exports = db;



