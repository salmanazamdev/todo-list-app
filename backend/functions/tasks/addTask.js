const pool = require('../../database/database');

const addTask = async (req, res) => {
const { userId, title, description, dueDate, dueTime, priority, category_id } = req.body;

  try {
    const result = await pool.query(
  `INSERT INTO tasks 
    (user_id, title, description, due_date, due_time, priority, category_id) 
   VALUES ($1, $2, $3, $4, $5, $6, $7) 
   RETURNING *`,
  [userId, title, description, dueDate, dueTime, priority, category_id]
);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = addTask;