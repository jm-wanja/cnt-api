let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;

let pool = new pg.Pool({
  port: 5432,
  database: 'countries',
  max: 10,
  host: 'localhost',
  user: 'juliemugira'
});

pool.connect((err, db, done) => {
  if (err) {
    console.log(err);
  } else {
    var name = 'Zambia';
    var continent = 'Africa';
    db.query('SELECT * from country', (err, table) => {
      if(err) {
        return console.log(err)
      } else {
        console.log(table)
      }
    })
  }
})

let app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => console.log('Listening on ' + PORT));

