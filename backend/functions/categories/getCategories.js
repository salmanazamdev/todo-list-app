const pool = require('../../database/database');

const getCategories = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM categories WHERE user_id = $1`,
      [userId]
    );
    res.status(200).json({ categories: result.rows });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

module.exports = getCategories;