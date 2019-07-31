const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./../database/db.js');
const app = express();
const port = process.env.port || 3005;
const cors = require('cors');
const morgan = require('morgan');


app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

app.use('/products/:id', express.static(__dirname + '/../dist'));

app.get('/product/:id', (req, res) => {

  dbConnection.queryDB(req.params.id, (result) => {
    res.send(result);
  });
});

app.get('/data/grab', (req, res) => {
  dbConnection.connection.query('SELECT * FROM photos', (err, data) => {
    if(err){return console.log(err, 'err')}
    res.send(data);
  })
})

app.post('/data/insert', (req, res) => {
  dbConnection.insertOne((result) =>{
    res.send(result);
  });
});

app.delete('/product/:id', (req, res) => {
  dbConnection.deleteFromDB(req.params.id, (result) => {
    res.send(result);
  });
}
);

app.listen(port, () => {
  console.log('Listening on port ' + port)
})