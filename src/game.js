var npc;
var myGamePiece;
var myObstacle;

var obstacles = [];

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    npc = new component(30, 30, "blue", 100, 120, 'npc');
    myObstacle  = new component(10, 200, "green", 300, 120);

    obstacles.push(npc);
    obstacles.push(myObstacle);

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, name) {
    this.name = (name) ? name : 'default';
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function(obstacles) {
        let tryX = this.x + this.speedX;
        let tryY = this.y + this.speedY;
        if (this.collideWith(tryX, tryY, obstacles))
            return;

        this.x = tryX;
        this.y = tryY;

    }
    this.talk = function(other) {
        if ((this.x == other.x + other.width + 1) ||
                (this.x + this.width + 1 ==  other.x) ||
                (this.y == other.y + other.height + 1) ||
                (this.y + this.height + 1 == other.y)) {
            other.talked();
        }
    }
    this.talked = function() {
        alert(this.name + ' say: hi');
    }
    this.collideWith = function(x, y, otherobjs) {
        for (let otherobj of otherobjs) {

            let myleft = x;
            let myright = x + (this.width);
            let mytop = y;
            let mybottom = y + (this.height);
            let otherleft = otherobj.x;
            let otherright = otherobj.x + (otherobj.width);
            let othertop = otherobj.y;
            let otherbottom = otherobj.y + (otherobj.height);
            if (isCollision(myleft, mytop, myright, mybottom, otherleft, othertop, otherright, otherbottom)) {
                return true;
            }
        }
        return false;

        function isCollision(left, top, right, bottom, otherLeft, otherTop, otherRight, otherBottom) {
            return !((bottom < otherTop) || (top > otherBottom) || (right < otherLeft) || (left > otherRight));
        }
    } 
}

function updateGameArea() {
    myGameArea.clear();
    myObstacle.update();
    myGamePiece.newPos(obstacles);    
    myGamePiece.update();
    npc.update();
}

function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function talk() {
    for (let obstacle of obstacles) {
        myGamePiece.talk(obstacle);
    }
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}