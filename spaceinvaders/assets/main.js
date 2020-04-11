
var hero = {
    top: 700,
    left: 550
};

var rockets = [];

var aliens = [
    { left: 200, top: 100 },
    { left: 300, top: 150 },
    { left: 400, top: 100 },
    { left: 500, top: 150 },
    { left: 600, top: 100 },
    { left: 700, top: 150 },
    { left: 800, top: 100 },
    { left: 900, top: 150 },
];

document.onkeydown = function (e) {
    console.log(e.keyCode);

    if (e.keyCode === 37) {
        hero.left = hero.left - 10;
        moveHero();
    }
    else if (e.keyCode === 39) {
        hero.left = hero.left + 10;
        moveHero();
    }
    else if (e.keyCode === 40) {
        hero.top = hero.top + 5;
        console.log("DOWN");
        moveHero();
    }
    else if (e.keyCode === 38) {
        hero.top = hero.top + 5;
        console.log("UP");
        moveHero();
    }
    else if (e.keyCode === 32) {
        rockets.push({
            left: hero.left + 15,
            top: hero.top,
        })
        console.log("FIRE");
        drawRockets();
    }
}

function moveHero() {
    document.getElementById('hero').style.left = hero.left + "px";
}

function drawRockets() {
    document.getElementById('rockets').innerHTML = "";
    for (var rocket = 0; rocket < rockets.length; rocket = rocket + 1) {
        document.getElementById('rockets').innerHTML +=
            `<div class='rocket' style='left:${rockets[rocket].left}px; 
                top:${rockets[rocket].top}px;'></div>`;
    }
}

function moveRockets() {
    for (var rocket = 0; rocket < rockets.length; rocket = rocket + 1) {
        rockets[rocket].top = rockets[rocket].top - 5;
    }
}

function drawAliens() {
    document.getElementById('aliens').innerHTML = "";
    for (var alien = 0; alien < aliens.length; alien = alien + 1) {
        document.getElementById('aliens').innerHTML +=
            `<div class='alien' style='left:${aliens[alien].left}px; 
                top:${aliens[alien].top}px;'></div>`;
    }
}

function moveAliens() {
    for (var alien = 0; alien < aliens.length; alien = alien + 1) {
        aliens[alien].left = aliens[alien].left + 2;
    }
}

function collisionDetection() {
    for (var alien = 0; alien < aliens.length; alien = alien + 1) {
        for (var rocket = 0; rocket < rockets.length; rocket = rocket + 1) {
            if (
                (rockets[rocket].top <= aliens[alien].top + 50) &&
                (rockets[rocket].top >= aliens[alien].top) &&
                (rockets[rocket].left >= aliens[alien].left) &&
                (rockets[rocket].left <= aliens[alien].left + 50)
            ) {
                console.log("HIT");
                aliens.splice(alien, 1);
                rockets.splice(rocket, 1);
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 50);
    moveRockets();
    drawRockets();
    moveAliens();
    drawAliens();
    collisionDetection();
}
gameLoop();
