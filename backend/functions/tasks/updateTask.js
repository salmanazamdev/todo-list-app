const pool = require('../../database/database');

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, dueTime, priority, completed, category_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           due_date = $3,
           due_time = $4,
           priority = $5,
           completed = $6,
           category_id = $7,
           updated_at = CURRENT_TIMESTAMP
       WHERE task_id = $8
       RETURNING *`,
      [title, description, dueDate, dueTime, priority, completed, category_id, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = updateTask;