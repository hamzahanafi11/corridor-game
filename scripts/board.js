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
	this.resetHighLight = function(){
		$( "ul li[highlighted*=true]" ).attr("style","background-color:#121212");
		$( "ul li[highlighted*=true]" ).attr("highlighted", false);
	}

	this.highLightBoxBarrier = function(pos){
		$('ul li:nth-child('+pos+')').attr("style","background-color:#5c5a6d");
		$('ul li:nth-child('+pos+')').attr("highlighted",true);
	}

	this.highLightOnlyBoxesForBarrier = function(box1Pos,box2Pos){
		// remove highlight of all boxes
		this.resetHighLight();

		// highlight only two boxes for barrier
		this.highLightBoxBarrier(box1Pos);
		this.highLightBoxBarrier(box2Pos);
	}

	this.drawBarrier = function(barrier){
		//$('ul li:nth-child('+barrier.box1Pos+')').attr("style","border-"+barrier.edge+":3px solid #FF0000");
		//$('ul li:nth-child('+barrier.box2Pos+')').attr("style","border-"+barrier.edge+":3px solid #FF0000");
		switch (barrier.edge) {
			case 'top':
				$('ul li:nth-child('+barrier.box1Pos+')').addClass("barrier-top-edge");
				$('ul li:nth-child('+barrier.box2Pos+')').addClass("barrier-top-edge");
			break;
			case 'bottom':
				$('ul li:nth-child('+barrier.box1Pos+')').addClass("barrier-bottom-edge");
				$('ul li:nth-child('+barrier.box2Pos+')').addClass("barrier-bottom-edge");
			break;
			case 'right':
				$('ul li:nth-child('+barrier.box1Pos+')').addClass("barrier-right-edge");
				$('ul li:nth-child('+barrier.box2Pos+')').addClass("barrier-right-edge");
			break;
			case 'left':
				$('ul li:nth-child('+barrier.box1Pos+')').addClass("barrier-left-edge");
				$('ul li:nth-child('+barrier.box2Pos+')').addClass("barrier-left-edge");
			break;
		}
	}
}
