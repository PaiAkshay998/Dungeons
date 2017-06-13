function drawText(ctx,text,font,x,y,color){
	ctx.save();
	ctx.font = String(font)+"px Arial";
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
	ctx.restore();
}

function drawRect(ctx,x,y,xw,yw,color){
	ctx.beginPath();
    ctx.rect(x,y,xw,yw);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function strokeRect(ctx,x,y,xw,yw,color){
	ctx.beginPath();
	ctx.strokeStyle=color;
	ctx.strokeRect(x,y,xw,yw);
	ctx.closePath();

}

function keyDownHandler(e) {
	HERO.move(e.keyCode);
}

function gameOver(key){
		alert("Game Over ! You ran out of "+key);
		location.reload();
}

function nextLevel(){
	MAZE.generate(Drow,Dcol);
	HERO.restartLocation();
	newStart = true;
	STATUS.level++;
	enemyList = [];
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.scale(1.5,1.5);
}


function cameraZoom(){
}

back = new Audio("sound/bleach_ost_1.mp3")
back.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
back.play();

document.addEventListener("keydown", keyDownHandler, false);