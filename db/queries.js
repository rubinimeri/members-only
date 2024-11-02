const pool = require('./pool');

async function getUser(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}

async function addUser(full_name, username, password) {
    await pool.query("INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3)", [full_name, username, password]);
}

module.exports = {
    getUser,
    addUser,
}