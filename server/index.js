const { client } = require('./db');

//building the init
const init = async () => {
  console.log('connecting to db');
  await client.connect();
  console.log('connected to db');
};

init();
