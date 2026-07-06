const db = require('../database/db');

async function login(req, res) {
  const { username, password } = req.body;

  const sql = `
    SELECT *
    FROM users
    WHERE username = ?
    AND password = ?
  `;

  db.get(sql, [username, password], (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Database error'
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username
      }
    });
  });
}

module.exports = {
  login
};