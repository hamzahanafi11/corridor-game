
// reate the board
var board = new Board();

// create players
var marian	 = new Player(05,'#e6183c','marian');
var steven	 = new Player(37,'#13aede','steven');
var kemberly = new Player(45,'#eaef2b','kemberly');
var brady	 = new Player(77,'#af5a0f','brady');

// init all players
marian.init();
steven.init();
kemberly.init();
brady.init();

// set initial position for players
board.init();

// game params
var turn   = 'marian';
var winner = null;

// playing and switching turns
$('ul li').on('click',function(evt){
	var goinTo = $(this).index() + 1;
	switch(turn){
		case 'marian':
			console.log('marian');
			console.log('==> from 		  : ' + marian.pos);
			console.log('==> to   		  : ' + goinTo);
			console.log('==> res  		  : ' + checkMove(marian.pos,goinTo));
			console.log('==> nearst edge  : ' + nearestEdgeBorder(evt.offsetX,evt.offsetY).edge);
			if( checkMove(marian.pos,goinTo) && board.isPlaceEmpty(goinTo) ){
				marian.moveTo(goinTo);
			}
			if(checkWinner(marian) == false){
				//turn = 'steven';
			}else{
				winner = 'marian';
				turn   = null;
				console.log('### CONGRATS Marian YOU ARE THE WINNER ###');
			}
		break;
		case 'steven':
			if( checkMove(steven.pos,goinTo) && board.isPlaceEmpty(goinTo) ){
				steven.moveTo(goinTo);
			}
			if(checkWinner(steven) == false){
				turn = 'kemberly';
			}else{
				winner = 'steven';
				console.log('### CONGRATS Steven YOU ARE THE WINNER ###');
			}
		break;
		case 'kemberly':
			if( checkMove(kemberly.pos,goinTo) && board.isPlaceEmpty(goinTo) ){
				kemberly.moveTo(goinTo);
			}
			if(checkWinner(kemberly) == false){
				turn = 'brady';
			}else{
				winner = 'kemberly';
				console.log('### CONGRATS Kemberly YOU ARE THE WINNER ###');
			}
		break;
		case 'brady':
			if( checkMove(brady.pos,goinTo) && board.isPlaceEmpty(goinTo) ){
				brady.moveTo(goinTo);
			}
			if(checkWinner(brady) == false){
				turn = 'marian';
			}else{
				winner = 'brady';
				console.log('### CONGRATS Brady YOU ARE THE WINNER ###');
			}
		break;
	}
});

// adding a Barrier
// hover an element

// var edge = null;
// var _watch = null;
// $('ul li').click(function(evt){
// 	var edge = nearestEdgeBorder(evt.offsetX,evt.offsetY).edge;
// 	if(edge != 'top' && edge != 'left'){
//         setInterval(function() {
//             if ( _watch !== edge ) {
//                 _watch = edge;
//                 $(this).removeAttr('style');
//             }
//         }, 100);
//     	$(this).css('border-'+edge,'4px solid red');
// 		$(this).attr(edge+'-barrier',1);
//     }
// });

// $('ul li').hover(function(evt){
// 	console.log(evt);
// 	console.log(evt.offsetX);
// 	console.log(evt.offsetY);
// 	var edge = nearestEdgeBorder(evt.offsetX,evt.offsetY).edge;
//
// 	if(edge != 'top' && edge != 'left'){
// 		var cellNumber = Number($(this).attr('cell-number'));
// 		var secondCellNumber = getSecondCellNumber(cellNumber,edge,evt.offsetX,evt.offsetY); // working on this function now
//         setInterval(function() {
//             if ( _watch !== edge ) {
//                 _watch = edge;
//                 $(this).removeAttr('style');
//             }
//         }, 100);
// 		$(this).css('border-'+edge,'4px solid red');
// 		$('ul li:nth-child('+secondCellNumber+')').css('border-'+edge,'4px solid red');
//     }
// 	if (evt.type == 'mouseleave' ){
// 		if( $(this).attr('right-barrier') == "0"){
// 			$(this).css('border-right', '4px solid #afafaf');
// 			$('ul li:nth-child('+secondCellNumber+')').css('border-right', '4px solid #afafaf');
// 		}
// 		if( $(this).attr('bottom-barrier') == "0"){
// 			$(this).css('border-bottom', '4px solid #afafaf');
// 			$('ul li:nth-child('+secondCellNumber+')').css('border-bottom', '4px solid #afafaf');
// 		}
// 	}
// });

// $('ul li').on('mousemove',function(evt){
// 	console.log(evt);
// 	console.log(evt.offsetX);
// 	console.log(evt.offsetY);
// 	var cellNumber = Number($(this).attr('cell-number'));
// 	var edge = nearestEdgeBorder(evt.offsetX,evt.offsetY).edge;
// 	var secondCellNumber = getSecondCellNumber(cellNumber,edge,evt.offsetX,evt.offsetY); // working on this function now
//
// 	if( $(this).attr('right-barrier') == "0"){
// 		$(this).css('border-right', '4px solid #afafaf');
// 		$('ul li:nth-child('+secondCellNumber+')').css('border-right', '4px solid #afafaf');
// 	}
// 	if( $(this).attr('bottom-barrier') == "0"){
// 		$(this).css('border-bottom', '4px solid #afafaf');
// 		$('ul li:nth-child('+secondCellNumber+')').css('border-bottom', '4px solid #afafaf');
// 	}
//
// 	$(this).css('border-'+edge,'4px solid red');
// 	$('ul li:nth-child('+secondCellNumber+')').css('border-'+edge,'4px solid red');
// });

// returns the number of cell that is next  to the current cell based on border
function getSecondCellNumber(cellNumber,edgeBorder,borderPosX,borderPosY){
	var cellPosition = isInEdge(cellNumber); // values =  T,R,B,L,false
	if(cellPosition == false){ // the cell is in the center of board
		if(edgeBorder == 'right'){
			return borderPosY < 25 ? cellNumber - 9 : cellNumber + 9;
		}
		else if(edgeBorder == 'bottom'){
			return borderPosX < 25 ? cellNumber - 1 : cellNumber + 1;
		}
	}
	switch(getCorner(cellNumber)){
		case 'TL':
			return edgeBorder == 'right' ? cellNumber + 9 : cellNumber + 1;
		break;
		case 'TR':
			return edgeBorder == 'right' ? cellNumber + 9 : cellNumber - 1;
		break;
		case 'BL':
			return edgeBorder == 'right' ? cellNumber - 9 : cellNumber + 1;
		break;
		case 'BR':
			return edgeBorder == 'right' ? cellNumber - 9 : cellNumber - 1;
		break;
	}
	switch(cellPosition){ // the cell is on an adge
		case 'T': // top edge
			if(edgeBorder == 'right'){
				return cellNumber + 9;
			}else if(edgeBorder == 'bottom'){
				return borderPosX < 25 ? cellNumber - 1 : cellNumber + 1;
			}
		break;
		case 'R': // right edge
			if(edgeBorder == 'right'){
				return borderPosY < 25 ? cellNumber - 9 : cellNumber + 9;
			}else if(edgeBorder == 'bottom'){
				return cellNumber - 1;
			}
		break;
		case 'B':  // bottom edge
			//return edgeBorder == 'right' ?  cellNumber - 9 : cellNumber - 1;
			if(edgeBorder == 'right'){
				return cellNumber - 9;
			}else if(edgeBorder == 'bottom'){
				return borderPosX < 25 ? cellNumber - 1 : cellNumber + 1;
			}
		break;
		case 'L': // left edge
			if(edgeBorder == 'right'){
				return borderPosY < 25 ? cellNumber - 9 : cellNumber + 9;
			}else if(edgeBorder == 'bottom'){
				return cellNumber + 1;
			}
		break;
	}
}

function nearestEdgeBorder(x,y){
	var topDistance	   = { distance : y - 0 , edge : 'top'};
	var rightDistance  = { distance : 50 - x , edge : 'right'};
	var bottomDistance = { distance : 50 - y , edge : 'bottom'};
	var leftDistance   = { distance : x - 0 , edge : 'left'};
	return minValue( minValue(topDistance,rightDistance),minValue(bottomDistance,leftDistance) );
}

function minValue(a,b){
	// even if a == b we want to return a value
	return a.distance < b.distance ? a : b;
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
				return newPos == currentPos - 9 || newPos == currentPos - 1 || newPos == currentPos + 9;
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
		default:
			return false;
		break;
	}
}
