const {
  client,
  createTables,
  createUser,
  createProduct,
  createFavorite,
  fetchUsers,
  fetchProducts,
  fetchFavorites,
  destroyFavorite,
} = require('./db');

const express = require('express');
const app = express();
app.use(express.json());

//building the init functionality
const init = async () => {
  console.log('connecting to db');
  await client.connect();
  console.log('connected to db');
  await createTables();
  console.log('tables created');
  const [charles, lewis, esteban, ferrari, mercedes, alpine] =
    await Promise.all([
      createUser({ username: 'charles', password: '16' }),
      createUser({ username: 'lewis', password: '44' }),
      createUser({ username: 'esteban', password: '31' }),
      createProduct({ name: 'ferrari' }),
      createProduct({ name: 'mercedes' }),
      createProduct({ name: 'alpine' }),
    ]);

  console.log(await fetchUsers());
  console.log(await fetchProducts());

  const [lewisMERC, lewisFERR] = await Promise.all([
    createFavorite({ user_id: lewis.id, product_id: ferrari.id }),
    createFavorite({ user_id: lewis.id, product_id: mercedes.id }),
  ]);

  console.log(await fetchFavorites(lewis.id));

  await destroyFavorite(lewisMERC);

  console.log(await fetchFavorites(lewis.id));

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

init();
