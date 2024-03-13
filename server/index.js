const { client, createTables, createUser, createProduct } = require('./db');

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
};

init();
