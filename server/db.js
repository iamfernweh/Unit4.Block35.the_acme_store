const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'posgres://localhost/acme_store_db'
);
module.exports = { client };
