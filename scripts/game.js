
// create the board
var board = new Board();

// create players
var marian	 = new Player(05,'#e6183c','marian');
var steven	 = new Player(37,'#13aede','steven');
var kemberly = new Player(45,'#eaef2b','kemberly');
var brady	 = new Player(77,'#af5a0f','brady');

var barriers = [];
//adding random barriers for tests
barriers.push({box1Pos: 40, box2Pos: 41, edge: "top"});
barriers.push({box1Pos: 15, box2Pos: 16, edge: "bottom"});
barriers.push({box1Pos: 34, box2Pos: 25, edge: "right"});
barriers.push({box1Pos: 25, box2Pos: 16, edge: "left"});
barriers.forEach(function(barrier){
	board.drawBarrier(barrier);
});

// init all players
marian.init();
steven.init();
kemberly.init();
brady.init();

// set initial position for players
board.init();

// game params
var turn			   = null;
var winner			   = null;
var userAddingBarrier  = false;
var barrierPart1BoxPos = -1;
var barrierPart2BoxPos = -1;

initDisplayScreen();

// playing and switching turns
$('ul li').on('click',function(evt){
	// mode building a barrier on board
	if(userAddingBarrier && barrierPart1BoxPos === -1){
		chooseFirstBox($(this).index() + 1);
		return;
	}
	else if(userAddingBarrier  && barrierPart2BoxPos === -1){
		var secondPos = $(this).index() + 1;
		// check if user clicked on highlighted friends boxes
		if(secondPos === barrierPart1BoxPos){
			return; // because can't be friend of myself !
		}
		var choosedFromFriends = false;
		var boxesFriendsPositions = findBoxFriends(barrierPart1BoxPos);
		boxesFriendsPositions.forEach(function(pos){
			if(secondPos === pos){
				choosedFromFriends = true;
			}
		});
		if(choosedFromFriends){
			chooseSecondBox(secondPos);
		}
		return;
	}
	// mode making a move on board
	var goinTo = $(this).index() + 1;
	switch(turn){
		case 'marian':
			if( checkMove(marian.pos,goinTo) && board.isPlaceEmpty(goinTo)  && !doBarrierExist(marian.pos,goinTo)){
				marian.moveTo(goinTo);
				if(checkWinner(marian) == false){
					giveTurnTo(steven);
				}else{
					winner = 'marian';
					turn   = null;
					console.log('### CONGRATS Marian YOU ARE THE WINNER ###');
				}
			}
		break;
		case 'steven':
			if( checkMove(steven.pos,goinTo) && board.isPlaceEmpty(goinTo) && !doBarrierExist(steven.pos,goinTo)){
				steven.moveTo(goinTo);
				if(checkWinner(steven) == false){
					giveTurnTo(kemberly);

				}else{
					winner = 'steven';
					console.log('### CONGRATS Steven YOU ARE THE WINNER ###');
				}
			}
		break;
		case 'kemberly':
			if( checkMove(kemberly.pos,goinTo) && board.isPlaceEmpty(goinTo) && !doBarrierExist(kemberly.pos,goinTo)){
				kemberly.moveTo(goinTo);
				if(checkWinner(kemberly) == false){
					giveTurnTo(brady);
				}else{
					winner = 'kemberly';
					console.log('### CONGRATS Kemberly YOU ARE THE WINNER ###');
				}
			}
		break;
		case 'brady':
			if( checkMove(brady.pos,goinTo) && board.isPlaceEmpty(goinTo) && !doBarrierExist(brady.pos,goinTo)){
				brady.moveTo(goinTo);
				if(checkWinner(brady) == false){
					giveTurnTo(marian);
				}else{
					winner = 'brady';
					console.log('### CONGRATS Brady YOU ARE THE WINNER ###');
				}
			}
		break;
	}
});

// moving/adding barriers to the board
/*
* TODO : ADD barriers :
*
*   1- click on button add barrier
*	2- choose an edge
*	3- tell user to select a box
*	4- color the box and search for it's friends and also color them
*	5- show validate button
*	6- valite the user choice and update the board
*
*	Note: tow boxes are friends if they can form a barrier
*
**/
$('#addBarrierBtn').on('click',function(evt){

	// check if player can build a barrier
	var player = getPlayer(turn);
	if(player.qteBarriers === 0){
		alert("No enough barriers for you :P");
		return;
	}
	//switch to mode barrier
	userAddingBarrier = true;
	//show the label to tell user to choose where to place the barrier
	$('.barrierOptions').show();
	$('#addBarrierBtn').hide();
});

$('#validateBarrierBtn').on('click',function(evt){
	//draw barrier
	if(barrierPart1BoxPos === -1 || barrierPart2BoxPos ===-1 ){
		return;
	}
	//this removes 1 barrier from player
	buildBarrier(turn);
	// reset variables for barrier
	barrierPart1BoxPos = -1;
	barrierPart2BoxPos = -1;
	board.resetHighLight();
	userAddingBarrier = false;
	$('.barrierOptions').hide();
	$('#addBarrierBtn').show();
	// give your turn to next player
	giveTurnTo(getPlayer(getNextTurn(turn)));

});

function buildBarrier(turn){
	var player = getPlayer(turn);
	player.builBarrier();
	updateScreen(player);
}

function getPlayer(turn){
	switch (turn) {
		case 'marian':
			return marian;
		break;
		case 'steven':
			return steven;
		break;
		case 'kemberly':
			return kemberly;
		break;
		case 'brady':
			return brady;
		break;
	}
}

function initDisplayScreen(){
	giveTurnTo(marian);
}

function giveTurnTo(player){
	turn = player.name;
	updateScreen(player);
}

function updateScreen(player){
	$('#player-icon').attr("style","color:" + player.color);
	$('#nbr-barriers').text(player.qteBarriers);
}

function getNextTurn(turn){
	switch (turn) {
		case 'marian':
			return 'steven';
		break;
		case 'steven':
			return 'kemberly';
		break;
		case 'kemberly':
			return 'brady';
		break;
		case 'brady':
			return 'marian';
		break;
	}
}

function drawBarrier(){
	// get the edge of barrier
	var edge = $("input[name='edgeBorder']:checked").val();
	// create the barrier and draw it, also keep track of it
	var barrier = new Barrier(barrierPart1BoxPos,barrierPart2BoxPos,edge);
	barriers.push(barrier);
	board.drawBarrier(barrier);
}

function chooseFirstBox(boxPos){
	//first barrier choosed
	barrierPart1BoxPos = boxPos;
	// highlight it
	board.highLightBoxBarrier(boxPos);
	// highlight it's friends
	var boxesFriendsPositions = findBoxFriends(boxPos);
	// if it has only 1 freind just draw the barrier, chooseSecondBox is skiped in this case
	if(boxesFriendsPositions.length === 1){
		var edge = $("input[name='edgeBorder']:checked").val();
		barrierPart2BoxPos = boxesFriendsPositions[0];
		board.highLightBoxBarrier(barrierPart2BoxPos);
		drawBarrier();
		return;
	}
	// now highlight friends
	boxesFriendsPositions.forEach(function(pos){
		board.highLightBoxBarrier(pos);
	});
}

function chooseSecondBox(boxPos){
	//first barrier choosed
	barrierPart2BoxPos = boxPos;
	// highlight it
	board.highLightOnlyBoxesForBarrier(barrierPart1BoxPos,barrierPart2BoxPos);
	drawBarrier();
}

// returns only position of friends (does not return the position of barrierPart1BoxPos)
function findBoxFriends(boxPos){
	if(boxPos < 0){
		return [];
	}
	var edge = $("input[name='edgeBorder']:checked").val();
	if(isInCorner(boxPos)){
		var corner = getCorner(boxPos);
		switch(corner){
			case 'TL':
				return edge === "top"    ? [boxPos + 1] :
					   edge === "bottom" ? [boxPos + 1] :
					   edge === "right"  ? [boxPos + 9] :
					   edge === "left"   ? [boxPos + 9] : []
			break;
			case 'TR':
				return edge === "top"    ? [boxPos - 1] :
					   edge === "bottom" ? [boxPos - 1] :
					   edge === "right"  ? [boxPos + 9] :
					   edge === "left"   ? [boxPos + 9] : []
			break;
			case 'BL':
				return edge === "top"    ? [boxPos + 1] :
					   edge === "bottom" ? [boxPos + 1] :
					   edge === "right"  ? [boxPos - 9] :
					   edge === "left"   ? [boxPos - 9] : []
			break;
			case 'BR':
				return edge === "top"    ? [boxPos - 1] :
					   edge === "bottom" ? [boxPos - 1] :
					   edge === "right"  ? [boxPos - 9] :
					   edge === "left"   ? [boxPos - 9] : []
			break;
		}
	}
	else if(isInEdge(boxPos) != false){
		switch(isInEdge(boxPos)){
			case 'T':
				return edge === "top" ? [boxPos - 1, boxPos + 1] :
					   edge === "bottom" ? [boxPos - 1, boxPos + 1] :
					   edge === "right" ? [boxPos + 9] :
					   edge === "left" ? [boxPos + 9] : []
			break;
			case 'R':
				return edge === "top" ? [boxPos - 1] :
					   edge === "bottom" ? [boxPos - 1] :
					   edge === "right" ? [boxPos - 9, boxPos + 9] :
					   edge === "left" ? [boxPos - 9, boxPos + 9] : []
			break;
			case 'B':
				return edge === "top" ? [boxPos - 1, boxPos + 1] :
					   edge === "bottom" ? [boxPos - 1, boxPos + 1] :
					   edge === "right" ? [boxPos - 9] :
					   edge === "left" ? [boxPos - 9] : []
			break;
			case 'L':
				return edge === "top" ? [boxPos + 1] :
					   edge === "bottom" ? [ boxPos + 1] :
					   edge === "right" ? [boxPos - 9, boxPos + 9] :
					   edge === "left" ? [boxPos - 9, boxPos + 9] : []
			break;
		}
	}
	else{ // in center of board
		return edge === "top" ? [boxPos - 1, boxPos + 1] :
			   edge === "bottom" ? [boxPos - 1, boxPos + 1] :
			   edge === "right" ? [boxPos - 9, boxPos + 9] :
			   edge === "left" ? [boxPos - 9, boxPos + 9] : []
	}
}

function doBarrierExist(fromPos, toPos){
	var barrierExist = false;
	barriers.forEach(function(barrier){
		switch(barrier.edge){
			case 'top':
				if((barrier.box1Pos === fromPos) && (barrier.box1Pos === toPos + 9)){
					barrierExist = true;
				}
				if((barrier.box2Pos === fromPos) && (barrier.box2Pos === toPos + 9)){
					barrierExist = true;
				}
				if((barrier.box1Pos === toPos) && (barrier.box1Pos === fromPos + 9)){
					barrierExist = true;
				}
				if((barrier.box2Pos === toPos) && (barrier.box2Pos === fromPos + 9)){
					barrierExist = true;
				}
			break;
			case 'right':
				if((barrier.box1Pos === fromPos) && (barrier.box1Pos === toPos - 1 )){
					barrierExist = true;
				}
				if((barrier.box2Pos === fromPos) && (barrier.box2Pos === toPos - 1 )){
					barrierExist = true;
				}
				if((barrier.box1Pos === toPos) && (barrier.box1Pos === fromPos - 1 )){
					barrierExist = true;
				}
				if((barrier.box2Pos === toPos) && (barrier.box2Pos === fromPos - 1 )){
					barrierExist = true;
				}
			break;
			case 'bottom':
				if((barrier.box1Pos === fromPos) && (barrier.box1Pos === toPos - 9 )){
					barrierExist = true;
				}
				if((barrier.box2Pos === fromPos) && (barrier.box2Pos === toPos - 9 )){
					barrierExist = true;
				}
				if((barrier.box1Pos === toPos) && (barrier.box1Pos === fromPos - 9 )){
					barrierExist = true;
				}
				if((barrier.box2Pos === toPos) && (barrier.box2Pos === fromPos - 9 )){
					barrierExist = true;
				}
			break;
			case 'left':
				if((barrier.box1Pos === fromPos) && (barrier.box1Pos === toPos + 1 )){
					barrierExist = true;
				}
				if((barrier.box2Pos === fromPos) && (barrier.box2Pos === toPos + 1 )){
					barrierExist = true;
				}
				if((barrier.box1Pos === toPos) && (barrier.box1Pos === fromPos + 1 )){
					barrierExist = true;
				}
				if((barrier.box2Pos === toPos) && (barrier.box2Pos === fromPos + 1 )){
					barrierExist = true;
				}
			break;
		}
	});
	return barrierExist;
}

function checkWinner(player){
	return isInEdge(player.pos) == player.winLine;
}

function checkMove(currentPos, newPos){

	if(isInCorner(currentPos)){
		var corner = getCorner(currentPos);
		switch(corner){
			case 'TL':
				return newPos == currentPos + 1 || newPos == currentPos + 9;
			break;
			case 'TR':
				return newPos == currentPos - 1 || newPos == currentPos + 9;
			break;
			case 'BL':
				return newPos == currentPos - 9 || newPos == currentPos + 1;
			break;
			case 'BR':
				return newPos == currentPos - 9 || newPos == currentPos - 1;
			break;
		}
	}
	else if(isInEdge(currentPos) != false){
		var edge = isInEdge(currentPos);
		switch(edge){
			case 'T':
				return newPos == currentPos - 1 || newPos == currentPos + 1 || newPos == currentPos + 9;
			break;
			case 'R':
				return newPos == currentPos - 9 || newPos == currentPos + 9 || newPos == currentPos - 1;
			break;
			case 'B':
				return newPos == currentPos - 1 || newPos == currentPos + 1 || newPos == currentPos - 9;
			break;
			case 'L':
				return newPos == currentPos - 9 || newPos == currentPos + 1 || newPos == currentPos + 9;
			break;
		}
	}
	else{ // in center of board
		return newPos == currentPos - 9 || newPos == currentPos - 1 || newPos == currentPos + 1 || newPos == currentPos + 9;
	}
}

function isInEdge(pos){
	if(isInTopEdge(pos)){
		return 'T';
	}else if(isInRightEdge(pos)){
		return 'R';
	}else if(isInLeftEdge(pos)){
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


// check if position is in a corner
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
		default:
			return false;
		break;
	}
}
