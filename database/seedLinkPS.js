const dbConnection = require('./dbPostgres.js');
const faker = require('faker');

const seed = async () => {

  for (let i = 0; i < 1000; i++) {
   let data = await dbConnection.client.query(`insert into photoLink (link) values ('${faker.fake("{{image.imageUrl}}")}')`);
   console.log(data);
  }
}

seed()
.finally(() => {
  dbConnection.client.end();
});