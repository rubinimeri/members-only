const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
    connectionString: "postgresql://rubin:rubin@localhost:5432/members_only"
})
