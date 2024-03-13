const { client, createTables } = require('./db');

//building the init functionality
const init = async () => {
  console.log('connecting to db');
  await client.connect();
  console.log('connected to db');
  await createTables();
  console.log('tables created');
};

init();
