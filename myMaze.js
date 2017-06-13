function myMaze(){
        // 0 is wall ,1 is walkable ,  2 is gold , 3 is powerup , 4 is food                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		this.row ;
		this.col ;
		this.maze = [[],[],[],[],[]];
		this.world = [];

		this.generate = function(row,col){
			this.row = row;
			this.col = col;

			var i=0,j=0,k=0;

			for(k=0;k<5;k++){ // generates our maze
					for(i=0;i<row;i++){
						var temp=[];
						for(j=0;j<col;j++){
							temp[j] = 0;
						}
						this.maze[k][i] = temp;
					} 
			}

			var startRow =0;
			var startCol =0;

			var ifVisited = [[0,0]];

			while(ifVisited.length){
				this.maze[4][startRow][startCol]=1;
				var directions = [];

				if(startCol>0 && this.maze[4][startRow][startCol-1]==0){
					directions.push("L");
				}

				if(startRow>0 && this.maze[4][startRow-1][startCol]==0){
					directions.push("U");
				}

				if(startCol<col-1 && this.maze[4][startRow][startCol+1]==0){
					directions.push("R");
				}

				if(startRow<row-1 && this.maze[4][startRow+1][startCol]==0){
					directions.push("D");
				}

				if(directions.length){
					ifVisited.push([startRow,startCol]);
					var ranDirection = directions[Math.floor(Math.random()*directions.length)];
					if (ranDirection=='L'){
						this.maze[0][startRow][startCol]=1;
						startCol = startCol - 1;
						this.maze[2][startRow][startCol]=1;
					}
					if (ranDirection=='U'){
						this.maze[1][startRow][startCol]=1;
						startRow = startRow - 1;
						this.maze[3][startRow][startCol]=1;
					}
					if (ranDirection=='R'){
						this.maze[2][startRow][startCol]=1;
						startCol = startCol +1;
						this.maze[0][startRow][startCol]=1;
					}
					if (ranDirection=='D'){
						this.maze[3][startRow][startCol]=1;
						startRow = startRow +1;
						this.maze[1][startRow][startCol]=1;
					}
				}
				else{
					var popped = ifVisited.pop();
					startRow = popped[0];
					startCol = popped[1];
				}
			}

			this.maze[0][0][0] = 1 ;
			this.maze[2][row-1][col-1]=1;

			var i=0,j=0,k,l;

			for(i=0;i<row*worldToGrid;i++){
				var temp = [];
				for(j=0;j<col*worldToGrid;j++){
					temp.push(0);
				}
				this.world[i] = temp;
			}

			for(i=0;i<row;i++){
				for(j=0;j<col;j++){
					var cell = [];
					var a = 0;
					for(a=0;a<4;a++) cell.push(this.maze[a][i][j]);
					for(k=worldToGrid*i+1;k<worldToGrid*i+worldToGrid-1;k++){
						for(l=worldToGrid*j+1;l<worldToGrid*j+worldToGrid-1;l++) this.world[k][l]=1;
						if (cell[0]==1) for(l=worldToGrid*i+1;l<worldToGrid*i+worldToGrid-1;l++) this.world[l][worldToGrid*j]=1;
						if (cell[1]==1) for(l=worldToGrid*j+1;l<worldToGrid*j+worldToGrid-1;l++) this.world[worldToGrid*i][l]=1;
						if (cell[2]==1) for(l=worldToGrid*i+1;l<worldToGrid*i+worldToGrid-1;l++) this.world[l][worldToGrid*j+worldToGrid-1]=1;
						if (cell[3]==1) for(l=worldToGrid*j+1;l<worldToGrid*j+worldToGrid-1;l++) this.world[worldToGrid*i+worldToGrid-1][l]=1;
					}
				}
			}
			this.spawnItems();	
		}

		this.show = function(){
			var i,j;
			for(i=0;i<this.row*worldToGrid;i++){
				for(j=0;j<this.col*worldToGrid;j++){
					if(this.world[i][j]==0)drawRect(ctx,i*(810/this.row/worldToGrid),(j)*(450/this.col/worldToGrid),(810/this.row/worldToGrid),(450/this.col/worldToGrid),"#000");
					else if(this.world[i][j]==2){
						ctx.drawImage(COIN,i*(810/MAZE.getRow()/worldToGrid),j*(450/MAZE.getCol()/worldToGrid),10,10);
					}
					else if(this.world[i][j]==3){
						ctx.drawImage(POWERUP,i*(810/MAZE.getRow()/worldToGrid),j*(450/MAZE.getCol()/worldToGrid),20,20);
					}
					else if(this.world[i][j]==4){
						ctx.drawImage(FOOD,i*(810/MAZE.getRow()/worldToGrid),j*(450/MAZE.getCol()/worldToGrid),15,15);
					}
				}
			}
		}

		this.getWorld = function(){
			return this.world;
		}

		this.getRow = function() {return this.row;}
		this.getCol = function() {return this.col;}

		this.spawnItems = function(){
			// this is for gold
			for(i=0;i<STATUS.getLevel()*10+1;i++){
				var gX = Math.floor(25+Math.random()*45);
				var gY = Math.floor(10+Math.random()*25);

				while(MAZE.getWorld()[gX][gY]==0 || MAZE.getWorld()[gX][gY]==2){
					gX = Math.floor(25+Math.random()*45);
					gY = Math.floor(10+Math.random()*25);
				}
				this.world[gX][gY]=2;

			}
			// for the powerup
			this.world[gX][gY]=3;

			for(i=0;i<3;i++){
				var gX = Math.floor(25+Math.random()*45);
				var gY = Math.floor(10+Math.random()*25);

				while(MAZE.getWorld()[gX][gY]==0 || MAZE.getWorld()[gX][gY]==2 || MAZE.getWorld()[gX][gY]==3){
					gX = Math.floor(25+Math.random()*45);
					gY = Math.floor(10+Math.random()*25);
				}
				this.world[gX][gY]=4;
			}
		}
	}	