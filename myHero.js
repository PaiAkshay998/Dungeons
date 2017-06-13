		function myHero(){
	this.x=1;
	this.y=0;
	this.height = 30;
	this.width = 25;
	this.image = RIGHT;

	this.show = function(){
		ctx.drawImage(MARKER,0,0,10,36);
		ctx.drawImage(MARKER,710,420,90,30);
        this.image.onload = ctx.drawImage(this.image,this.x*(810/MAZE.getRow()/worldToGrid),this.y*(450/MAZE.getCol()/worldToGrid),this.width,this.height);
	}

	this.move = function(key){

		cameraMove = true;

		if(key==39 && MAZE.getWorld()[this.x+1][this.y]!=0){
			this.x++;
			if(this.x>=10 && this.x<=42)
			ctx.translate(-9,0);
			this.image = RIGHT;
		}
		else if(key==37 && MAZE.getWorld()[this.x-1][this.y]!=0){
			this.x--;
			if(this.x>=7 && this.x<=37)
			ctx.translate(9,0);
			this.image = LEFT;
		}
		else if(key==38 && MAZE.getWorld()[this.x][this.y-1]!=0){
			this.y--;
			if(this.y>=17 && this.y<=30)
			ctx.translate(0,9);
			this.image = DOWN;
		}
		else if(key==40 && MAZE.getWorld()[this.x][this.y+1]!=0){
			this.y++;
			if(this.y>=17 && this.y<=30)
			ctx.translate(0,-9);
			this.image = UP;
		}

		var p00 = MAZE.getWorld()[this.x][this.y];
		var p01 = MAZE.getWorld()[this.x][this.y+1];
		var p10 = MAZE.getWorld()[this.x+1][this.y];
		var p11 = MAZE.getWorld()[this.x+1][this.y+1];

		if(p00==2 || p00==3 || p00==4){
			STATUS.itemPicked(p00);
			MAZE.world[this.x][this.y]=1;
		}

		else if(p01==2 || p01==3 || p01==4){
			STATUS.itemPicked(p01);
			MAZE.world[this.x][this.y+1]=1;
		}

		else  if(p10==2 || p10==3 || p10==4){
			STATUS.itemPicked(p10);
			MAZE.world[this.x+1][this.y]=1;
		}

		else if(p11==2 || p11==3 || p11==4){
			STATUS.itemPicked(p11);
			MAZE.world[this.x+1][this.y+1]=1;
		}

		else if(key==32){
			var directionOfShot = -1;
			// 1 is down , 2 is up , 3 is left , 4 is right;
			if(this.image==RIGHT)
				this.shoot(4);
			else if(this.image==LEFT)
				this.shoot(3);
			else if(this.image==UP)
				this.shoot(2);
			else if(this.image==DOWN)
				this.shoot(1);
		}

		if (this.x<0)
			this.x = 0;
		if (this.x>800)
			this.x = 800;
		if (this.y<0)
			this.y = 0;
		if (this.y>450)
			this.y = 450;

		heroMoved = enemyList.length;
		STATUS.reduceStamina();
	}

	this.getX = function(){return this.x;}
	this.getY = function(){return this.y;}

	this.winCheck = function(){
		if (this.x>=79 && this.x<=88 && this.y>=45 && this.y<=50)
			return true;
		else
			return false;
	}

	this.restartLocation = function(){
		this.x = 0;
		this.y = 0;
		this.image = RIGHT;
		ctx.translate(800,400);
	}

	this.shoot = function(direction){
		if(canShoot){
			BULLET = new myBullet(this.x,this.y,direction);
			bulletCreated = true;
			BULLET.move();
			firing.play();
			canShoot = false;
		}
		else
			empty.play();
	}
}