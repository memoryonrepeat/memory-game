const express = require('express');
const app = express();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = lowdb(new FileSync('db.json'));
const bodyParser = require('body-parser');

// Set some defaults (required if your JSON file is empty)
db.defaults({
	leaderboard: {}
}).write()

/*// Add a post
db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome'})
  .write()

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
  .write()
  
// Increment count
db.update('count', n => n + 1)
  .write()*/

app.use(express.static('public'));
app.use(bodyParser.json());


// app.get('/', (req, res) => res.send('hello world'));

app.post('/score', function (req, res) {
	console.log('node',req.body);
	db.set('leaderboard.'+req.body.username, req.body.score).write();
	res.json(req.body);
});

app.get('/leaderboard', function (req, res) {
	res.json(db.read());
});

app.listen(3000, () => console.log('Memory game running on port 3000'));

