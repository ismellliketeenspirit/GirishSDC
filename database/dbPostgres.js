const {Client} = require('pg');

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'amazon',
  port: 5432
});

client.connect();

// const qry = 'select now()';
// const val = '';

// client.query(qry, val, (err, res) => {
//   console.log(err ||  res.rows[0]);
//   client.end();
// })

const runQuery = (sqlStr, arr) => {
  return new Promise((resolve, reject) => {
    client.query(sqlStr, [arr], (err, data) => {
      if(err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


module.exports = {
  client,
  runQuery
}