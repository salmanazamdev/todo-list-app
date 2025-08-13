const pool = require('../../database/database');

const addCategory = async (req, res) => {
  const { userId, name, color } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO categories (user_id, name, color)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, name, color]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = addCategory;