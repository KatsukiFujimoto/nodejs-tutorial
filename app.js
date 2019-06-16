const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var messages = [];
var id = 1;

// Enable parsing json data from body
app.use(bodyParser.json());

// GET - localhost:3000/
app.get('/', function (req, res) {
  res.send('Our Messenger System');
});

// GET - localhost:3000/messages
app.get('/messages', function(req, res) {
  res.json(messages);
});

// GET - localhost:3000/messages/2
app.get('/messages/:id', function(req, res) {
  var id = parseInt(req.params.id, 10);
  var flag = false;

  for(var i = 0; i < messages.length; i++) {
    if (messages[i].id === id) {
      res.json(messages[i]);
      flag = true;
      break;
    }
  }

  if (!flag) {
    res.send('Cannot find any messages with this ID...');
  }
});

// POST - localhost:3000/messages
app.post('/messages/', function(req, res) {
  var body = req.body;

  var new_message = {
    id: id++,
    name: body.name,
    content: body.content,
    read: body.read
  }

  messages.push(new_message);
  res.send('New message added!');
});

// DELETE - localhost:3000/messages/2
app.delete('/messages/:id', function(req, res) {
  var id = parseInt(req.params.id, 10);
  var flag = false;

  for(var i = 0; i < messages.length; i++) {
    if (messages[i].id === id) {
      messages.splice(i,1);
      flag = true;
      break;
    }
  }

  if (!flag) {
    res.send('Cannot find any messages with this ID...');
  } else {
    res.send('Message with ID = ' + id + ' has been deleted');
  }
});

app.listen(3000, function() {
  console.log('Server is running...');
});