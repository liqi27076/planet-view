
var gameArea = {
    canvas : document.createElement("canvas"),
    objects: [],
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        // $(canvas).click(function(e) {
        //     alert(e.pageX, e.pageY);
        // });

        this.update();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update : function() {
        this.clear();
        for( let object of this.objects) {
            object.update();
        }
    }
};

function startGame() {
    role = new component('leo', 30, 30, 10, 120, 'red');
    let npc = new component('npc', 30, 30, 100, 120, 'blue');
    let building  = new component('building', 10, 200, 300, 120, 'gray');

    gameArea.objects.push(role);
    gameArea.objects.push(npc);
    gameArea.objects.push(building);

    gameArea.start();
}

var role;

function component(name, width, height, x, y, resource) {
    this.name = (name) ? name : 'default';
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        ctx = gameArea.context;
        ctx.fillStyle = resource;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.clearMove();
    };
    this.clearMove = function() {
        this.speedX = 0;
        this.speedY = 0;
    };
    this.newPos = function(obstacles) {
        let tryX = this.x + this.speedX;
        let tryY = this.y + this.speedY;
        if (this.collideWith(tryX, tryY, obstacles))
            return;

        this.x = tryX;
        this.y = tryY;
    };
    this.talk = function(other) {
        if ((this.x == other.x + other.width + 1) ||
                (this.x + this.width + 1 ==  other.x) ||
                (this.y == other.y + other.height + 1) ||
                (this.y + this.height + 1 == other.y)) {
            other.talked();
        }
    };
    this.talked = function() {
        alert(this.name + ' say: hi');
    };

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

function moveup() {
    role.speedY = -1;
    gameArea.update();
}

function movedown() {
    role.speedY = 1; 
    gameArea.update();
}

function moveleft() {
    role.speedX = -1;
    gameArea.update();
}

function moveright() {
    role.speedX = 1;
    gameArea.update();
}

function talk() {
    for (let obstacle of obstacles) {
        role.talk(obstacle);
    }
}

function clearmove() {
    role.speedX = 0; 
    role.speedY = 0; 
}