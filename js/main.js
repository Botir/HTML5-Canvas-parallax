const images = {
	bg: './img/bg.png',
	ground: './img/ground.png',
	cloud: './img/clouds.png',
	home1: './img/home1.png',
	backhome1: './img/backhome1.png',
	backhome2: './img/backhome2.png'
};
const screenSize = {
	x:2253, 
	y:1211
};
var lastFrameTime = 0;
var canvas = document.querySelector('canvas');
canvas.width = screenSize.x;
canvas.height = screenSize.y;
resizeScreen();
var ctx = canvas.getContext('2d');

/**
* Classes
*/
class Background {
	constructor() {
		this.img = new Image();
		this.img.src = images.bg;
		this.img.onload = () => {
			this.draw(0);
		};
	}
	draw(delta) {
		ctx.drawImage(this.img, 0, 0);
	}
}

class Clouds {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 10;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.cloud;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / this.img.width);
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % this.img.width;
		ctx.save();
		ctx.translate(-new_pos, 0);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * this.img.width, 0);
        }
		ctx.restore();
	}
}


class Ground {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 50;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.ground;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / this.img.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % this.img.width;
		ctx.save();
		ctx.translate(-new_pos, canvas.height-this.img.height);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * this.img.width, 0);
        }
		ctx.restore();
	}
}

class FrontHome {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 40;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.home1;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / this.img.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % this.img.width;
		ctx.save();
		ctx.translate(-new_pos, canvas.height-this.img.height-100);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * this.img.width, 0);
        }
		ctx.restore();
	}
}

class BackHome1 {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 20;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.backhome1;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / this.img.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % this.img.width;
		ctx.save();
		ctx.translate(-new_pos, canvas.height-this.img.height-200);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * this.img.width, 0);
        }
		ctx.restore();
	}
}

class BackHome2 {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 10;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.backhome2;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / this.img.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % this.img.width;
		ctx.save();
		ctx.translate(-new_pos, canvas.height-this.img.height-400);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * this.img.width, 0);
        }
		ctx.restore();
	}
}


function update() {
    requestAnimationFrame(update);
    var now = Date.now();
    var deltaSeconds = (now - lastFrameTime) / 200;
    lastFrameTime = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    bg.draw(deltaSeconds);
    cloud.draw(deltaSeconds);
    backHome2.draw(deltaSeconds);
    backHome1.draw(deltaSeconds);
    frontHome.draw(deltaSeconds);
    ground.draw(deltaSeconds);
}

var bg = new Background();
var cloud = new Clouds();
var backHome2 = new BackHome2();
var backHome1 = new BackHome1();
var frontHome = new FrontHome();
var ground = new Ground();


function resizeScreen(){
	var aspectRatio = screenSize.x/screenSize.y;
	var canvas = document.getElementById('canvas');
	var windowRatio = window.innerWidth/window.innerHeight;

	if (aspectRatio < windowRatio){
		canvas.style.width="auto";
		canvas.style.height=window.innerHeight+'px';
	}else{
		canvas.style.height="auto";
		canvas.style.width=window.innerWidth+'px';
	}
}

function startUpdate() {
    lastFrameTime = Date.now();
    requestAnimationFrame(update);
}
window.addEventListener("resize", resizeScreen);
startUpdate();