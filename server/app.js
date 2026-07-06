const express = require('express');
const cors = require('cors');
const parkingRoutes = require('./routes/parkingRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register parking routes
app.use('/api/parking', parkingRoutes);

// Login route
app.use('/api/auth', authRoutes);

// deploy
app.use(
  express.static(
    path.join(__dirname, 'dist')
  )
);
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, 'dist', 'index.html')
  );
});

module.exports = app;
