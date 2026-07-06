const path = require('path');
const app = require('./app');
const initializeDatabase = require('./services/initDb');

const PORT = 3001;

(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
})();
