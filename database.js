const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the database
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a table for storing form submissions
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "submissions" is ready.');
        }
    });
});

module.exports = db;