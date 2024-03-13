const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'posgres://localhost/acme_store_db'
);
const uuid = require('uuid');

//create the table
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS favorites;
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    CREATE TABLE products();
    CREATE TABLE favorites();

  `;
  await client.query(SQL);
};

//always remember to export
module.exports = { client, createTables };
