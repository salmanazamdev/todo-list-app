const { Pool } = require('pg');

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'todo_db',
    password: 'root',
    port: 5432,
});

module.exports = pool;