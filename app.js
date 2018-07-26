const express = require('express');
const app = express();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = lowdb(new FileSync('db.json'));
const bodyParser = require('body-parser');

db.defaults({
	leaderboard: []
}).write()

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/score', function (req, res) {
	console.log('node',req.body);
	db.get('leaderboard').push({
		username: req.body.username,
		score: req.body.finalScore,
		flips: req.body.totalFlips,
		time: req.body.totalTime
	}).write();
	res.json(req.body);
});

app.get('/leaderboard', function (req, res) {
	res.json({
		final: db.get('leaderboard').orderBy(['score','flips','time'],['desc','asc','asc']).take(3).value(),
		flips: db.get('leaderboard').orderBy(['flips','time'],['asc','asc']).take(3).value(),
		time: db.get('leaderboard').orderBy(['time','flips'],['asc','asc']).take(3).value()
	});
});

app.listen(3000, () => console.log('Memory game running on port 3000'));

