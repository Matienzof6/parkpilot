const fs = require('fs');
const path = require('path');

const dbPath = path.join(
  __dirname,
  '..',
  'database',
  'parking.db'
);

const date = new Date()
  .toISOString()
  .split('T')[0];

const destination = path.join(
  __dirname,
  '..',
  'backups',
  `nparking-${date}.db`
);

fs.copyFileSync(dbPath, destination);

console.log('Backup created:', destination);