const pool = require('./pool');

async function getUser(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

async function addUser(full_name, username, password) {
    await pool.query("INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3)", [full_name, username, password]);
}

async function updateMembership(id) {
    await pool.query("UPDATE users SET membership_status = true WHERE id = $1", [id]);
}

async function addMessage(title, message, userId) {
    await pool.query("INSERT INTO messages (title, message, user_id) VALUES ($1, $2, $3)", [title, message, userId]);
}

async function deleteMessage(messageId) {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}

async function getMessages() {
    const { rows } = await pool.query("SELECT users.username, messages.id, messages.title, messages.message, messages.created_at FROM users INNER JOIN messages ON users.id = messages.user_id")
    return rows;
}

async function updateAdminPrivilege(id) {
    await pool.query("UPDATE users SET admin = true WHERE id = $1", [id]);
}

module.exports = {
    getUser,
    addUser,
    updateMembership,
    getUserById,
    addMessage,
    deleteMessage,
    getMessages,
    updateAdminPrivilege,
}