var currentlyFlipped = [];

// Assign an index number to each goal for faster reference during randomization
function transformData(goal_items){
	var goals = {};
	for (var key in goal_items){
		goals[goal_items[key].position-1] = goal_items[key];
	}
	return goals;
};

// Given board size N<=14, assign randomly each board to a goal item and a language
function randomizeBoard(size){
	var goal_pot = []; // Goal candidates
	var square_pot = []; // Square candidates

	for (var i=0; i<size*size/2; i++){
		goal_pot.push(i);
	}

	for (var i=0; i<size*size; i++){
		square_pot.push(i);
	}

	var board = {};
	for (var i=0; i<size*size/2; i++){

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

	board.size = size;
	return board;
};

// Map the initialized board states to goals provided by API
function mapBoardGoals(board, goals){
	for (var key in board){
		if (key !== 'size'){
			if (board[key][1]=='en'){
				board[key] = [goals[board[key][0]].item.cue, board[key]];
			}
			else{
				board[key] = [goals[board[key][0]].item.response, board[key]];
			}
		}
	}
	return board;
};

function initializeBoard(size, data){
	return mapBoardGoals(randomizeBoard(size), transformData(data));
};

function getElapsedTime(start){
	var hours, mins, secs, total;
  	secs = Math.floor((Date.now() - start) / 1000);
  	total = secs;
  	mins = Math.floor(secs / 60);
  	secs = secs % 60;
  	hours = Math.floor(mins / 60);
  	mins = mins % 60;
  	hours = hours % 24;
  	return { 
  		hours: hours, 
  		mins: mins, 
  		secs: secs,
  		total: total
  	};	
};
