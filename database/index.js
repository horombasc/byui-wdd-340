const { Pool } = require("pg");
require("dotenv").config();

let pool;

if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

// Export the raw Pool for connect-pg-simple
module.exports = pool;




