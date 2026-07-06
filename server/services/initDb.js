const fs = require('fs');
const path = require('path');
const db = require('../database/db');

function initializeDatabase() {
  const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  db.exec(schema, (err) => {
    if (err) {
      console.error('Database initialization failed:', err);
      return;
    }

    console.log('Database initialized successfully.');
  });
}

module.exports = initializeDatabase;
