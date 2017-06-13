function statusBar(){
	this.level = 1;
	this.hp = 50;
	this.stamina = 50;
	this.gold = 0;
	this.time = 60;
	this.hpColor = "#f00";

	this.show = function(){
		drawRect(ctxx,0,0,810,50,"#000");


	    drawText(ctxx,"Level : "+String(this.level),20,15,30,"#fff");
	    drawRect(ctxx,95,0,2,50,"#ECC93D");

	    drawText(ctxx,"HP : ",20,110,30,"#fff");
	    drawRect(ctxx,160,15,150*this.hp/50.0,20,this.hpColor);

	    drawRect(ctxx,325,0,2,50,"#ECC93D");

	    drawText(ctxx,"Stamina : ",20,340,30,"#fff");
	    drawRect(ctxx,435,15,150*this.stamina/50.0,20,"#0f0");

	    drawRect(ctxx,600,0,2,50,"#ECC93D");

	    drawText(ctxx,"Gold : "+String(this.gold),20,615,30,"#fff");

	    drawRect(ctxx,698,0,2,50,"#ECC93D");

	    var mins = String(Math.floor(this.time/60));
	    var seconds = String(this.time%60);
	    if (seconds.length==1)
	    	seconds="0"+seconds;
	    drawText(ctxx,mins+" : "+seconds,20,720,30,"#fff");
	}

	this.statusUpdate = function(){
		this.time-=1;
		if (this.time<=0)
			gameOver('Time');

		if(this.stamina<=0)
			gameOver('Stamina');

		if(this.hp<=0)
			gameOver('HP');
	}

	this.gotAttacked = function(){
		this.hp-=10;
	}

	this.getLevel = function(){
		return this.level;
	}

	this.getTime = function(){
		return this.time;
	}

	this.getLevel = function(){
		return this.level;
	}

	this.reduceStamina = function(){
		this.stamina-=0.1;	
	}

	this.itemPicked = function(item){
		if(item==2){
			this.gold++;
			coin.play();
		}
		else if(item==3){
			this.hp = 50;
			powerup.play();
		}
		else if(item==4){
			if(this.stamina+10>=50)
				this.stamina=50;
			else
				this.stamina+=10;
			food.play();
		}
	}

}