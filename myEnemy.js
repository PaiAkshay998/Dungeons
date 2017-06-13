function myEnemy(id){
	this.x; 
	this.y;
	this.image = eUP;
	this.width = 25;
	this.height = 30;
	this.id = id;

	// 1 is down , 2 is up , 3 is left , 4 is right;
	
	this.findLocation = function(){
		this.x = Math.floor(20+Math.random()*50);
		this.y = Math.floor(5+Math.random()*30);

		while(MAZE.getWorld()[this.x][this.y]==0){
			this.x = Math.floor(30+Math.random()*40);
			this.y = Math.floor(10+Math.random()*20);
		}
	}

	this.triggerCheck = function(){
		if (Math.abs(Math.sqrt((this.x-HERO.getX())**2 + (this.y-HERO.getY())**2)) <=8.2)
			return true;
		else
			return false;
	}

	this.activeMode = function(){

		if((this.x-HERO.getX())>0){
			this.move(3);
		}

		else if((this.x-HERO.getX())<0){
			this.move(4);
		}

		else if((this.y-HERO.getY())<0){
			this.move(1);
		}

		else if((this.y-HERO.getY())>0){
			this.move(2);
		}

		if (Math.abs(Math.sqrt((this.x-HERO.getX())**2 + (this.y-HERO.getY())**2))<=1.5){
			STATUS.gotAttacked();
			this.dies();
		}
	}

	this.passiveMode = function(){
		var direction = 1 + Math.ceil(Math.random()*3);
		this.move(direction);	
	}

	this.move = function(direction){
		
		if(heroMoved)
		{
			if(direction==1 && MAZE.getWorld()[this.x][this.y+1]==1){
					this.y++;
					this.image = eUP;
				}
		
				else
					if(direction==2 && MAZE.getWorld()[this.x][this.y-1]==1){
					this.y--;
					this.image = eDOWN;
				}
		
				else
					if(direction==3 && MAZE.getWorld()[this.x-1][this.y]==1){
					this.x--;
					this.image = eLEFT;
				}
		
				else
					if(direction==4 && MAZE.getWorld()[this.x+1][this.y]==1){
					this.x++;
					this.image = eUP;
				}

				heroMoved--;
			}
	}

	this.show = function(){
		this.image.onload = ctx.drawImage(this.image,this.x*(810/MAZE.getRow()/worldToGrid),this.y*(450/MAZE.getCol()/worldToGrid),this.width,this.height);
	}

	this.getId = function(){
		return this.id;
	}

	this.getX = function(){
		return this.x;
	}

	this.getY = function(){
		return this.y;
	}

	this.dies = function(){
		for(i=0;i<enemyList.length;i++){
			if(enemyList[i]!=undefined)
			if(enemyList[i].getId()==this.id){
				enemyList[i] = undefined;
				ctx.drawImage(EXPLODE,this.x*(810/MAZE.getRow()/worldToGrid),this.y*(450/MAZE.getCol()/worldToGrid));
				ctx.drawImage(EXPLODE,this.x*(810/MAZE.getRow()/worldToGrid),this.y*(450/MAZE.getCol()/worldToGrid));
				ctx.drawImage(EXPLODE,this.x*(810/MAZE.getRow()/worldToGrid),this.y*(450/MAZE.getCol()/worldToGrid));
				ctx.drawImage(EXPLODE,this.x*(810/MAZE.getRow()/worldToGrid),this.y*(450/MAZE.getCol()/worldToGrid));
				ctx.drawImage(EXPLODE,this.x*(810/MAZE.getRow()/worldToGrid),this.y*(450/MAZE.getCol()/worldToGrid));
				blast.play();
				return null;
			}
		}
	}

	this.gotShot = function(){
		if((Math.sqrt((BULLET.getX()-this.x)**2+(BULLET.getY()-this.y)**2))<=1.5)
			return true;
		else
			return false;
	}

}