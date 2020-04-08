
var hero = {
    top: 700,
    left: 550
};

var missiles = [];

var enemies = [
    { left: 200, top: 100 },
    { left: 300, top: 100 },
    { left: 400, top: 100 },
    { left: 500, top: 100 },
    { left: 600, top: 100 },
    { left: 700, top: 100 },
    { left: 800, top: 100 },
    { left: 900, top: 100 },
    { left: 200, top: 160 },
    { left: 300, top: 160 },
    { left: 400, top: 160 },
    { left: 500, top: 160 },
    { left: 600, top: 160 },
    { left: 700, top: 160 },
    { left: 800, top: 160 },
];

document.onkeydown = function (e) {
    console.log(e.keyCode);

    if (e.keyCode === 37) {
        hero.left = hero.left - 10;
        moveHero()
    }
    else if (e.keyCode === 39) {
        hero.left = hero.left + 10;
        moveHero()
    }
    else if (e.keyCode === 32) {
        missiles.push({
            left: hero.left + 15,
            top: hero.top
        })
        drawMissiles()
    }
}

function moveHero() {
    document.getElementById('hero').style.left = hero.left + "px";
}

function drawMissiles() {
    document.getElementById('missiles').innerHTML = "";
    for (var missile = 0; missile < missiles.length; missile = missile + 1) {
        document.getElementById('missiles').innerHTML +=
            `<div class='missile' style='left:${missiles[missile].left}px; 
                top:${missiles[missile].top}px;'></div>`;
    }
}

function moveMissiles() {
    for (var missile = 0; missile < missiles.length; missile = missile + 1) {
        missiles[missile].top = missiles[missile].top - 5;
    }
}

function drawEnemies() {
    document.getElementById('enemies').innerHTML = "";
    for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
        document.getElementById('enemies').innerHTML +=
            `<div class='enemy' style='left:${enemies[enemy].left}px; 
                top:${enemies[enemy].top}px;'></div>`;
    }
}

function moveEnemies() {
    for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
        enemies[enemy].top = enemies[enemy].top + 2;
    }
}

function collisionDetection() {
    for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
        for (var missile = 0; missile < missiles.length; missile = missile + 1) {
            if (
                (missiles[missile].top <= enemies[enemy].top + 50) &&
                (missiles[missile].top >= enemies[enemy].top) &&
                (missiles[missile].left >= enemies[enemy].left) &&
                (missiles[missile].left <= enemies[enemy].left + 50)
            ) {
                console.log("HIT");
                enemies.splice(enemy, 1);
                missiles.splice(missile, 1);
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 100)
    moveMissiles();
    drawMissiles();
    moveEnemies();
    drawEnemies();
    collisionDetection();
}
gameLoop();
