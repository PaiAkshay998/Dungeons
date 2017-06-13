function myBullet(x,y,direction){
	this.x=x;
	this.y=y;
	this.direction = direction;

	this.move = function(){

			if(this.direction==1){
				this.y--;
			}

			else if(this.direction==2){
				this.y++;
			}

			else if(this.direction==3){
				this.x--;
			}

			else if(this.direction==4){
				this.x++;
			}

		this.show();
	}

	this.show = function(){
      ctx.beginPath();
      ctx.arc(this.x*(810/MAZE.getRow()/worldToGrid), this.y*(450/MAZE.getCol()/worldToGrid), 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#810617';
      ctx.fill();
	}

	this.getX = function(){
		return this.x;
	}

	this.getY = function(){
		return this.y;
	}

	this.hitWall = function(){
		if(MAZE.getWorld()[this.x][this.y]==0)
			return true;
		else
			return false;
	}
}