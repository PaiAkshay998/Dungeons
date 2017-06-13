// global variable declaration
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var scoreBoard = document.getElementById("scoreCanvas");
var ctxx = scoreBoard.getContext("2d");
var rightPressed,leftPressed,upPressed,downPressed;
var	Drow = 9;
var Dcol = 5;
var worldToGrid = 10;
var timeCount=0;
var enemyList = [];
var newStart = true;
var i;
var heroMoved = 0;
var bulletCreated = false;
var canShoot = true;
var reloadTime = 0;
var cameraMove = false;

alert("Use the arrow keys to move !\n\nYou have two minutes to complete each level !\n\nEither flee or shoot your enemies with SpaceBar !\n\nReload takes 20 seconds. So shoot wisely  !\n\nThe ghosts have hollow body. So make sure you aim for the head !\n\nEat plenty of food to maintain your stamina ! \n\nAnd at the same time , try to loot as much as you can !")

// myHero images 
DOWN = new Image(); DOWN.src = "icons/back.png";
LEFT = new Image(); LEFT.src = "icons/left.png";
RIGHT = new Image(); RIGHT.src = "icons/right.png";
UP = new Image(); UP.src = "icons/front.png";

// myEnemy images
eUP = new Image(); eUP.src = "icons/enemy_front.png";
eDOWN = new Image(); eDOWN.src = "icons/enemy_back.png";
eRIGHT = new Image(); eRIGHT.src = "icons/enemy_right.png";
eLEFT = new Image(); eLEFT.src = "icons/enemy_left.png"

// black-white flag image
MARKER = new Image(); MARKER.src = "icons/marker.png";

//explosion
EXPLODE = new Image(); EXPLODE.src = "icons/explode.png";

//Items
COIN = new Image(); COIN.src = "icons/coin.png";
POWERUP = new Image(); POWERUP.src = "icons/Powerup.jpg";
FOOD = new Image(); FOOD.src = "icons/food.png";


//sound sfx
blast = new Audio("sound/blast.wav");
firing = new Audio("sound/firing.wav");
empty = new Audio("sound/empty.wav");
coin = new Audio("sound/coin.mp3");
food = new Audio("sound/food.mp3");
powerup = new Audio("sound/powerup.mp3");

// Object declaration
STATUS = new statusBar();
HERO = new myHero();
MAZE = new myMaze();

// random maze gets generated
MAZE.generate(Drow,Dcol);
ctx.scale(1.5,1.5);
var play = function(){

	if(newStart){
		newStart = false;
		for(i=0;i<STATUS.getLevel();i++){
			enemy = new myEnemy(i);
			enemy.findLocation();
			if(i!=0)
				while(Math.sqrt((enemyList[i-1].getX()-enemy.getX())**2 + (enemyList[i-1].getY()-enemy.getY())**2)<=20)
					enemy.findLocation();
			enemyList.push(enemy);
		}
	}

	if(timeCount==1000){
		timeCount=0;
		STATUS.statusUpdate();
	}

	drawRect(ctx,0,0,800,450,"#E4E3DF");
	STATUS.show()
	MAZE.show();
	HERO.show();


	if(cameraMove){
		cameraMove= false;
		cameraZoom();
	}

	for(i=0;i<enemyList.length;i++){
		if(enemyList[i]!=undefined){
			if (enemyList[i].triggerCheck()){
				enemyList[i].activeMode();
			}
			else{
				enemyList[i].passiveMode();
			}

			if(enemyList[i]!=undefined)
				if(bulletCreated){
					if(enemyList[i].gotShot()){
						bulletCreated = false;
						enemyList[i].dies();
					}
					if(BULLET.hitWall())
						bulletCreated = false;
				}
			
			if(enemyList[i]!=undefined)
			enemyList[i].show();
		}
	}

	if(HERO.winCheck())
		nextLevel();
	if(bulletCreated)
		if(timeCount%20==0)
			BULLET.move();

	if(!canShoot){
		reloadTime+=20;
		if(reloadTime==10*1000){
			reloadTime = 0;
			canShoot = true;
		}
	}
	timeCount+=20;
}

// game starts
setInterval(play,20);