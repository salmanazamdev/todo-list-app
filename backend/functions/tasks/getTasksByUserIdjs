const pool = require('../../database/database');

const getTasksByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(`
      SELECT * FROM tasks WHERE user_id = $1
    `, [userId]);

    res.status(200).json({ tasks: result.rows });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

module.exports = getTasksByUserId;
