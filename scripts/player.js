function Player(pos,color,name) {

	this.oldPos = -1;
	this.pos 	= pos;
	this.color 	= color;
	this.name	= name

	this.moveTo = function(newPos){
		this.oldPos = this.pos;
		this.pos = newPos;
		board.refreshPlayerPosition(this);
	};

	this.buildWall = function(){

	};
}
