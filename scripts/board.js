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

	this.isPlaceEmpty = function(pos){
		return this.boxes[pos - 1] == 0;
	};

	this.drawPlayers = function(){
		// TODO : create a function drawPlayer(player) and call it here
		var self = this; // to access the 'this' variable inside forEach
		this.boxes.forEach(function(el,index){
			if(marian.pos == index){
				self.boxes[index - 1] = marian.name;
				$('ul li:nth-child('+marian.pos+')').find('i').addClass("fa-chess-pawn");
				$('ul li:nth-child('+marian.pos+')').find('i').attr("style","color:"+marian.color);
			}
			else if(steven.pos == index){
				self.boxes[index - 1] = steven.name;
				$('ul li:nth-child('+steven.pos+')').find('i').addClass("fa-chess-pawn");
				$('ul li:nth-child('+steven.pos+')').find('i').attr("style","color:"+steven.color);
			}
			else if(kemberly.pos == index){
				self.boxes[index - 1] = kemberly.name;
				$('ul li:nth-child('+kemberly.pos+')').find('i').addClass("fa-chess-pawn");
				$('ul li:nth-child('+kemberly.pos+')').find('i').attr("style","color:"+kemberly.color);

			}
			else if(brady.pos == index){
				self.boxes[index - 1] = brady.name;
				$('ul li:nth-child('+brady.pos+')').find('i').addClass("fa-chess-pawn");
				$('ul li:nth-child('+brady.pos+')').find('i').attr("style","color:"+brady.color);

			}
		});
	};

	this.refreshPlayerPosition = function(player){

		// remove player from old position
		$('ul li:nth-child('+player.oldPos+')').find('i').removeClass("fa-chess-pawn");
		$('ul li:nth-child('+player.oldPos+')').find('i').removeAttr("style");
		this.boxes[player.oldPos - 1] = 0; // empty

		// TODO : call the drawPlayer(player)
		// draw player in new position
		$('ul li:nth-child('+player.pos+')').find('i').addClass("fa-chess-pawn");
		$('ul li:nth-child('+player.pos+')').find('i').attr("style","color:"+player.color);
		this.boxes[player.pos - 1] = player.name; // empty
	}
}
