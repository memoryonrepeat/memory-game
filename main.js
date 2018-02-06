var API_PATH = __dirname+"/api/goal.js";
var SIZE = 4; // Configurable

var fs = require('fs');

// Parse DB and hold its info in an object
function parseDB() {
	return JSON.parse(fs.readFileSync(API_PATH, 'utf8'));
}

// Assign an index number to each goal for faster reference during randomization
function transformData(goal_items){
	var goals = {};
	for (var key in goal_items){
		goals[goal_items[key].position-1] = goal_items[key];
	}
	return goals;
};

// Given board size N<=14, assign randomly each board to a goal item and a language
function initializeBoard(){
	var goal_pot = []; // Goal candidates
	var square_pot = []; // Square candidates

	for (var i=0; i<SIZE*SIZE/2; i++){
		goal_pot.push(i);
	}
	for (var i=0; i<SIZE*SIZE; i++){
		square_pot.push(i);
	}

	// console.log(goal_pot, square_pot);
	var board = {};
	for (var i=0; i<SIZE*SIZE/2; i++){

		var goal_index = Math.floor(Math.random() * goal_pot.length);

		var square_index = Math.floor(Math.random() * square_pot.length);
		board[square_pot[square_index]] = [goal_pot[goal_index], 'en'];

		// console.log(square_pot[square_index], goal_pot[goal_index]);

		square_pot.splice(square_index,1);

		square_index = Math.floor(Math.random() * square_pot.length);
		board[square_pot[square_index]] = [goal_pot[goal_index], 'ja'];

		// console.log(square_pot[square_index], goal_pot[goal_index]);

		square_pot.splice(square_index,1);
		goal_pot.splice(goal_index,1);
	}
	console.log(board);
	return board;
}

// Map the initialized board states to goals provided by API
function mapBoardGoals(board, goals){
	// console.log(goals);
	for (var key in board){
		// console.log(board[key]);
		if (board[key][1]=='en'){
			board[key] = [goals[board[key][0]].item.cue, board[key]];
		}
		else{
			board[key] = [goals[board[key][0]].item.response, board[key]];
		}
	}
	return board
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var goals = transformData(parseDB().goal_items);

//console.log(goals);

// console.log(getRandomInt(100));

// console.log(initializeBoard());

console.log(mapBoardGoals(initializeBoard(), transformData(parseDB().goal_items)));

