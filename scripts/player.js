function Player(pos,color,name) {

	this.oldPos = -1;
	this.pos 	= pos;
	this.color 	= color;
	this.name	= name;
	this.path 	= [pos]; // to track the path walked by the player
	this.winLine = null;

	this.init = function(){
		this.winLine = this.getWineLine(this.path[0]);
	}

	this.moveTo = function(newPos){
		this.oldPos = this.pos;
		this.pos 	= newPos;
		this.path.push(newPos);
		board.refreshPlayerPosition(this);
	};

	this.getWineLine = function(pos){
		switch (pos) {
			case 5:
				return 'B';
			break;
			case 37:
				return 'R';
			break;
			case 45:
				return 'L';
			break;
			case 77:
				return 'T';
			break;
			default:
				return false;
			break;
		}
	}

	this.drawPath = function(){
		this.path.forEach(function(el){
			$('ul li:nth-child('+el+')').attr('style','background-color:red');
		});
	};

	this.buildWall = function(){

	};
}
