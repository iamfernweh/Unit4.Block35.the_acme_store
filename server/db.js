const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'posgres://localhost/acme_store_db'
);
const uuid = require('uuid');
const bcrypt = require('bcrypt');

//create the table
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS favorites;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
        CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    CREATE TABLE products(
        id UUID PRIMARY KEY,
        name VARCHAR (100) UNIQUE NOT NULL
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

//create user
const createUser = async ({ username, password }) => {
  const SQL = `
      INSERT INTO users(id, username, password)
      VALUES($1, $2, $3)
      RETURNING *
      `;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0];
};

//create product
const createProduct = async ({ name }) => {
  const SQL = `
        INSERT INTO products(id, name)
        VALUES($1, $2)
        RETURNING *
        `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

//create favorite
const createFavorite = async ({ user_id, product_id }) => {
  const SQL = `
    `;
};

//always remember to export
module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  createFavorite,
};
