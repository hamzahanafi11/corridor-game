function Board() {
	this.boxes = [
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0
	];
	this.init = function(){
		this.drawPlayers();
	};
	this.drawPlayers = function(){
		var self = this; // to access the 'this' variable inside forEach
		this.boxes.forEach(function(el,index){
			if(marian.pos == index){
				self.boxes[index - 1] = 'M';
				$('ul li:nth-child('+marian.pos+')').find('i').addClass("fa-chess-pawn");
				$('ul li:nth-child('+marian.pos+')').find('i').attr("style","color:"+marian.color);
			}
			else if(steven.pos == index){
				self.boxes[index - 1] = 'S';
				$('ul li:nth-child('+steven.pos+')').find('i').addClass("fa-chess-pawn");
				$('ul li:nth-child('+steven.pos+')').find('i').attr("style","color:"+steven.color);
			}
			else if(kemberly.pos == index){
				self.boxes[index - 1] = 'K';
				$('ul li:nth-child('+kemberly.pos+')').find('i').addClass("fa-chess-pawn");
				$('ul li:nth-child('+kemberly.pos+')').find('i').attr("style","color:"+kemberly.color);

			}
			else if(brady.pos == index){
				self.boxes[index - 1] = 'B';
				$('ul li:nth-child('+brady.pos+')').find('i').addClass("fa-chess-pawn");
				$('ul li:nth-child('+brady.pos+')').find('i').attr("style","color:"+brady.color);

			}
		});
	};
}