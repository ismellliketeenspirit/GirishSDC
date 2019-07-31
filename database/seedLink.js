const dbConnection = require('./db.js');
const faker = require('faker');

const seed = async () => {

  for (let i = 0; i < 1000; i++) {
    await dbConnection.connection.query(`insert into photoLinks (link) values('${faker.fake("{{image.imageUrl}}")}')`);
  }
}

seed()
.finally(() => {
  dbConnection.connection.end();
});