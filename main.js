var API_PATH = __dirname+"/api/goal.js";
var fs = require('fs');

// Parse DB and hold its info in an object
function parseDB() {
	return JSON.parse(fs.readFileSync(API_PATH, 'utf8'));
}

var raw_data = parseDB();


console.log(raw_data);