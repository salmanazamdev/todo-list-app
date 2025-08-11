const pool = require('../../database/database');

const addTasks = async (req, res) => {
  const { userId, taskName, priority } = req.body;

  try {

    const result = await pool.query(
      `INSERT INTO tasks 
        (user_id, task_name, priority) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [userId, taskName, priority]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = addTasks;
