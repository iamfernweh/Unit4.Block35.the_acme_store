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
    CREATE TABLE products(
        id UUID PRIMARY KEY,
        name VARCHAR (128) UNIQUE NOT NULL
    );
    CREATE TABLE favorites(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        product_id UUID REFERENCES products(id) NOT NULL,
        CONSTRAINT user_product_unique UNIQUE (user_id, product_id)
    );
  `;
  await client.query(SQL);
};

//always remember to export
module.exports = { client, createTables };
