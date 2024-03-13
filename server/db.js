const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'posgres://localhost/acme_store_db'
);

//create the table
const createTables = async () => {
  const SQL = ``;
  await client.query(SQL);
};

//always remember to export
module.exports = { client, createTables };
