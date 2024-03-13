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

//get users
app.get('/api/users', async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (er) {
    next(er);
  }
});

//get products
app.get('/api/products', async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (er) {
    next(er);
  }
});

//get favorites
app.get('/api/users/:id/favorites', async (req, res, next) => {
  try {
    res.send(await fetchFavorites(req.params.id));
  } catch (er) {
    next(er);
  }
});

//post favorite
app.post('/api/users/:id/favorites', async (req, res, next) => {
  try {
    const userProduct = await createFavorite({
      user_id: req.params.id,
      product_id: req.body.product_id,
    });
    res.send(201).send(userProduct);
  } catch (er) {
    next(er);
  }
});

//delete favorites
app.delete('/api/users/:userId/favorites/:id', async (req, res, next) => {
  try {
    await destroyFavorite({ id: req.params.id, user_id: req.params.userId });
    res.sendStatus(204);
  } catch (er) {
    next(er);
  }
});

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
    console.log(`curl localhost:${port}/api/users`);
    console.log(`curl localhost:${port}/api/products`);
    console.log(`curl localhost:${port}/api/users/${lewis.id}/favorites`);
    console.log(
      `curl -X POST localhost:${port}/api/users/${lewis.id}/favorites -d '{"product_id": "${alpine.id}"}' -H "Content-Type:application/json"`
    );
    console.log(
      `curl -X DELETE localhost:${port}/api/users/${lewis.id}/favorites/${lewisMERC}`
    );
  });
};

init();
