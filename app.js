const express = require('express')
var bodyParser = require("body-parser");
const connectDb = require('./db/connection');
var MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://dbUser:dbUser@cluster0.xtuor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
connectDb();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/index.html"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get('/volunteer.html', function (req, res) {
  res.sendFile(__dirname + "/volunteer.html");

});
app.post('/volunteer.html', (req, res) => {
  let name = req.body.name;
  let city = req.body.city;
  let phone = req.body.phone;

  var userobj = {
    name: name,
    city: city,
    phone: phone,
  };
  console.log(userobj);
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("resource");
    dbo.collection("volunteer").insertOne(userobj, (err, res) => {
      if (err) throw err;
      console.log("volunteer inserted");
      db.close();
  });
  });
  res.redirect('/volunteer.html')

});
app.get('/addHealthcare.html', function (req, res) {
  res.sendFile(__dirname + "/addhealthcare.html");

});
app.post('/addhealthcare.html', (req, res) => {
  let state = req.body.state;
  let city = req.body.city;
  let name = req.body.name;
  let facility = req.body.facility;
  let address = req.body.address;
  let pincode = req.body.pincode;
  let contact = req.body.contact;
  let beds = req.body.beds;

  var userobj = {
    state:state,
    city: city,
    name: name,
    address: address,
    facility: facility,
    pincode: pincode,
    contact: contact,
    beds: beds
  };
  console.log(userobj);
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("resource");
    dbo.collection("hospital").insertOne(userobj, (err, res) => {
      if (err) throw err;
      console.log("hospital data inserted");
      db.close();
  });
  });
  res.redirect('/addhealthcare.html')

});
app.get('/hospital.html', function (req, res) {
  res.sendFile(__dirname + "/hospital.html");

});
app.get("/get_hospital", (req, res) => {
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("resource");
    dbo
      .collection("hospital")
      .find()
      .toArray((err, res) => {
        hospitals = [...res];

        // console.log(men_objects);

        db.close();
      });
  });
  setTimeout(() => {
    res.json(hospitals);
  }, 2000);
});
app.listen(3000, function () {
  console.log("Server is running on port 3000...")
})