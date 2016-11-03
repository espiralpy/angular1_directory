var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

var bodyParser = require('body-parser');

var port = 5002;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//insert a data in mongo
app.post('/contactlist', function(req, res){
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, data){
    res.json(data);
  });
});

//delete a data in mongo
app.delete('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err,data){
    res.json(data);
  });
});

//update data in mongo
app.get('/contactlist/:id',function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err,data){
    res.json(data);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, data) {
      res.json(data);
    }
  );
});

//show all datas
app.get('/contactlist', function(req, res){
  console.log('I receove a GET request');

  db.contactlist.find(function(err,data){
    console.log(data);
    res.json(data);
  })
  /*var person1 = {
      name : 'Tin',
      email: 'tin@hotmail.com',
      number: ' 111 111 111'
  };

  var person2 = {
      name : 'Ariana',
      email: 'ariana@hotmail.com',
      number: ' 222 222 222'
  };

  var person3 = {
      name : 'Yary',
      email: 'yary@hotmail.com',
      number: ' 333 333 333'
  };

  var contactList = { person1, person2, person3 };
  res.json(contactList);
  */
});

//port for server
app.listen(port);
console.log("Server running on port " + port );
