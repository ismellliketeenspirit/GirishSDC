const mysql = require('mysql');
const fetch = require('node-fetch');
const key = require('./../src/unsplashAPI/unsplash.js');
const faker = require('faker');

const connection = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'amazon',
});

connection.connect();

const insertIntoDB = (photoid, username, link, productTag, tagID) => {
  const sql = `INSERT INTO photos (photoid, link, username, productTag, tagID)
               VALUES ('${photoid}', '${link}', '${username}', '${productTag}', '${tagID}')`;
  connection.query(sql, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(productTag, ' ', tagID, ' record inserted successefully! from the db');
    }
  })
}

const runQuery = (sqlStr, arr) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlStr, [arr], (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


const insertOne = (cb) => {
  const sql = 'select distinct productTag from photos';
  connection.query(sql, (err, row) => {
    if (err) {
      console.log('Distinct product tag error ', err);
    } else {
      let uniqPrd = [];
      row.forEach(element => {
        uniqPrd.push(element.productTag);
      });
      let fakePrd = faker.fake("{{commerce.product}}");
      while (uniqPrd.indexOf(fakePrd) > -1) {
        fakePrd = faker.fake("{{commerce.product}}");
      }

      fetch(
        `https://api.unsplash.com/search/photos/?query=${fakePrd}&client_id=${key.key.accessKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          for (let k = 0; k < 5; k++) {
            insertIntoDB(
              data.results[k].id,
              data.results[k].user.username,
              data.results[k].urls.full,
              fakePrd,
              uniqPrd.length);
          }

          cb(fakePrd);
        });
    }
  });

}


const queryDB = (id, cb) => {
  const sql = `SELECT link FROM photos WHERE tagID = ${id}`;
  connection.query(sql, (err, row) => {
    // console.log(row, 'data from queryDB');
    return err ? console.log(err) : cb(row);
  });
}



const deleteFromDB = (id, cb) => {
  const sql = `delete FROM photos WHERE tagID = ${id}`;
  connection.query(sql, (err, row) => {
    // console.log(row, 'data from queryDB');
    return err ? console.log(err) : cb(row);
  });
}

module.exports = {
  insertIntoDB,
  connection,
  queryDB,
  insertOne,
  deleteFromDB,
  runQuery
};