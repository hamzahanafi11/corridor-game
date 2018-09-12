
// reate the board 
var board = new Board();

// create players
var marian	 = new Player(63,'#e6183c');
var steven	 = new Player(37,'#13aede');
var kemberly = new Player(45,'#eaef2b');
var brady	 = new Player(77,'#af5a0f');

// set initial position for players
board.init();

// game params 
var turn = 'M';


$('ul li').on('click',function(evt){
	var goinTo = $(this).index();
	switch(turn){
		case 'M':
			console.log('M');
			console.log('==> from : ' + marian.pos);
			console.log('==> to   : ' + goinTo);
			console.log('==> res  : ' + checkMove(marian.pos,goinTo));
			if(checkMove(marian.pos,goinTo)){
				marian.moveTo(goinTo);
				turn = 'S';
			}
		break;
		case 'S':
			console.log('S');
			turn = 'K';
		break;
		case 'K':
			console.log('K');
			turn = 'B';
		break;
		case 'B':
			console.log('B');
			turn = 'M';
		break;
	}
});


function checkMove(currentPos, newPos){
	
	if(isInCorner(currentPos)){
		var corner = getCorner(currentPos);
		switch(corner){
			case 'TL':
				return newPos == 1 || newPos == 9;
			break;
			case 'TR':
				return newPos == 7 || newPos == 17;
			break;
			case 'BL':
				return newPos == 63 || newPos == 73;
			break;
			case 'BR':
				return newPos == 71 || newPos == 79;
			break;
		}
	}
	else if(isInEdge(currentPos) != false){
		var edge = isInEdge(currentPos);
		switch(edge){
			case 'T':
				return newPos == currentPos - 1 || newPos == currentPos + 1;
			break;
			case 'R':
				return newPos == currentPos - 9 || newPos == currentPos + 9;
			break;
			case 'B':
				return newPos == currentPos - 1 || newPos == currentPos + 1;
			break;
			case 'L':
				return newPos == currentPos - 9 || newPos == currentPos + 9;
			break;
		}
	}
}

function isInEdge(pos){
	if(isInTopEdge(pos)){
		return 'T';
	}else if(isInRightEdge(pos)){
		return 'R';
	}else if(isInLeftEdge()){
		return 'L';
	}else if(isInBottomEdge(pos)){
		return 'B';
	}
	else{
		return false;
	}
}

function isInTopEdge(pos){
	return pos <= 9;
}

function isInBottomEdge(pos){
	return pos >= 73;
}

function isInRightEdge(pos){
	return pos % 9 == 0 ? true : false;
}

function isInLeftEdge(pos){
	for(var i = 1 ; i < 100 ; i+=9){
		if(pos==i){
			return true;
		}
	}
	return false;
}


// check if a player is in a corner
function isInCorner(pos){
	return pos == 1 || pos == 9 || pos == 73 || pos == 81;
}

// get the corner where player is positioned
function getCorner(pos){
	switch(pos){
		case 1:
			return 'TL'; // top left
		break;
		case 9:
			return 'TR'; // top right
		break;
		case 73:
			return 'BL'; // bottom left
		break;
		case 81:
			return 'BR'; // bottom right
		break;
	}
}








