var express = require('express');
var router = express.Router();


/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')

// Setup connection
var username = "postgres" 
var password = "Fateoffrog*7" 
var host = "comappinginstance.cnvglqsojvpf.us-east-2.rds.amazonaws.com"
var database = "postgres" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection


// Set up your database query to display GeoJSON (this takes the database rows and displays them as shapefiles on the webpage)
var devsite_request_query = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((suitability, description)) As properties FROM devsite_solar As lg) As f) As fc";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mapper' });
});
module.exports = router;



/* GET the viewing page */
router.get('/devsiteviewer', function(req, res) {
  var client = new Client(conString); // Setup our Postgres Client
  client.connect(); // connect to the client
  var query = client.query(new Query(devsite_request_query)); // Run our Query
  query.on("row", function (row, result) {
      result.addRow(row);
  });
  // Pass the result to the map page
  query.on("end", function (result) {
      var data = result.rows[0].row_to_json // Save the JSON as variable data
      res.render('devsiteviewer', {
          title: "Viewing Page", // Give a title to our page
          jsonData: data // Pass data to the View
      });
  });
});


/* GET devsite page */
router.get('/devsite', function(req, res) {
  var client = new Client(conString); // Setup our Postgres Client
  client.connect(); // connect to the client
  
  var query = client.query(new Query(devsite_request_query)); // Run our Query
  query.on("row", function (row, result) {
      result.addRow(row);
  });
  // Pass the result to the map page
  query.on("end", function (result) {
      res.render('devsite', {
          title: "Mapper", // Give a title to our page
          
      });
  });
});


//gets the variable sq12 from the website and combines it with sql to make the full SQL statement and then sends this statement to the database
router.post('/apidevsite', (request, response) => {
  var client = new Client(conString); // Setup our Postgres Client
  client.connect(); // connect to the client
  const devsiteData = request.body.sql2
  var sql = "INSERT INTO devsite_solar (geom, suitability, description, date) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
  insertdevsiteQuery = sql+devsiteData;

  //console.log(insertdevsiteQuery);

  client.query(insertdevsiteQuery);
  response.end();

});


/* GET test page */
router.get('/test', function(req, res) {
  var client = new Client(conString); // Setup our Postgres Client
  client.connect(); // connect to the client
  
  var query = client.query(new Query(devsite_request_query)); // Run our Query
  query.on("row", function (row, result) {
      result.addRow(row);
  });
  // Pass the result to the map page
  query.on("end", function (result) {
      res.render('test', {
          title: "Mapper", // Give a title to our page
          
      });
  });
});


