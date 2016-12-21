window.onload = init;

var canvas,cH,cW,ctx,boardX,boardY;
var ball,board,bg;
var vx,vy,ballX,ballY;
cH = 800;
cW = 1000;
ballX = 400;
ballY = 400;
vx = 6;
vy = 6;
boardY = 700;
var imgbriW,imgbriH;
var bricksarr=[];
imgbriH=50;
imgbriW=150;
window.onmousemove = mouseMove;
window.onkeydown = keyDown;
function init(){
	trace("游戏初始化完成!");
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	
	bg = addimg("img/bg.png");
	ball = addimg("img/ball.png");
	board = addimg("img/board.png");
	imgBricks();
	si = setInterval(updatecanvas,1000/60);
}

function updatecanvas(){
	ctx.clearRect(0,0,cH,cW);
	ballMove();
	ctx.drawImage(bg,0,0);
	ctx.drawImage(ball,ballX,ballY);
	ctx.drawImage(board,boardX,boardY);
	
	drawBricks();
	ballbrickhit();
}

function ballbrickhit(){
	for (var i = 0; i < bricksarr.length; i++) {
		var item = bricksarr[i];
		var b = ballbricksHit(item.x,item.y,imgbriW,imgbriH);
		if (b) {
			bricksarr.splice(i,1);
			vy *= -1;
			item = null;
		}
	}
}

function drawBricks(){
	for (var i = 0; i < bricksarr.length; i++) {
		var item = bricksarr[i];
		
		ctx.drawImage(item.item,item.x,item.y);
	}
}

function imgBricks(){
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 4; j++) {
			var lo = Math.ceil(Math.random()*6);
			var str = "img/"+lo+".png";
			var item = addimg(str);
			var x = i * (imgbriW+10) +20;
			var y = j * (imgbriH+5)+30;
			var obj = {item:item,x:x,y:y};
			bricksarr.push(obj);
		}
	}
}

function ballMove(){
	ballX += vx;
	ballY += vy;
	if (ballX >= cW - ball.width) {
		vx *= -1;
	}
	else if (ballX <= 0) {
		vx *= -1;
	}
	else if (ballY <= 0){
		vy *= -1;
	}
	else if (ballboardHit()) {
		vy *= -1;
	}
	else if(ballY >= cH){
		console.log("Game Over");
		clearInterval(si);
	}
}

function ballbricksHit(x,y,w,h){
	if (ballX+ball.width/2- x >=0 && ballX+ball.width/2- x <= w) {
		if (ballY-y<=h){
			return true;
		}else{
			return false;
		}
	} else{
		return false;
	}
}

function ballboardHit(){
	if (ballX+ball.width/2-boardX>=0 && ballX+ball.width/2-boardX<=board.width) {
		if (boardY - ballY <= ball.height && boardY - ballY >= ball.height-2*vy) {
			return true;
		}
		else{
			return false;
		}
	}
	else{
			return false;
		}
}

function mouseMove(e){
	boardX = e.clientX - board.width/2;
}

function keyDown(e){
	if (e.keyCode == 37) {
		boardX -= 8;
	}
	if (e.keyCode == 39) {
		boardX += 8;
	}
}

function addimg(_src){
	var img = new Image();
	img.src = _src;
	return img;
}

function trace(msi){
	console.log(msi);
}
