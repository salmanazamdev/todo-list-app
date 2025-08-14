const pool = require('../../database/database');

const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM categories`
    );
    res.status(200).json({ categories: result.rows });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

module.exports = getCategories;