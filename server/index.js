const { client, createTables, createUser } = require('./db');

//building the init functionality
const init = async () => {
  console.log('connecting to db');
  await client.connect();
  console.log('connected to db');
  await createTables();
  console.log('tables created');
  const [charles, lewis, esteban] = await Promise.all([
    createUser({ username: 'charles', password: '999' }),
  ]);
};

init();
