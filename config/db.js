const { Pool } = require('pg');
require('dotenv').config(); // jika pakai .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;