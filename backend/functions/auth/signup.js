const pool = require("../../database/database");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB and return the new user ID
    const result = await pool.query(
      `INSERT INTO users (username, password)
       VALUES ($1, $2)
       RETURNING user_id`, 
      [username, hashedPassword]
    );

    const newUserId = result.rows[0].user_id;

    res.status(201).json({
      userId: newUserId, 
      message: "User registered successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = signup;
