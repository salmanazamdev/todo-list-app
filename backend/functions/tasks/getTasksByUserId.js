const pool = require('../../database/database');

const getTasksByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        t.*, 
        c.name AS category_name, 
        c.color AS category_color, 
        c.image_url AS category_image_url
      FROM tasks t
      LEFT JOIN categories c ON t.category_id = c.category_id
      WHERE t.user_id = $1
    `, [userId]);

    res.status(200).json({ tasks: result.rows });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

module.exports = getTasksByUserId;