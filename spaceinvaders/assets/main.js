
var spaceship = {
    top: 750,
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
        spaceship.left = spaceship.left - 10;
        moveSpaceship();
    }
    else if (e.keyCode === 39) {
        spaceship.left = spaceship.left + 10;
        moveSpaceship();
    }
    else if (e.keyCode === 40) {
        spaceship.top = spaceship.top + 5;
        console.log("DOWN");
        moveSpaceship();
    }
    else if (e.keyCode === 38) {
        spaceship.top = spaceship.top - 5;
        console.log("UP");
        moveSpaceship();
    }
    else if (e.keyCode === 32) {
        rockets.push(
            {
                left: spaceship.left + 15,
                top: spaceship.top,
            })
        console.log("FIRE");
        drawRockets();
    }
}

function moveSpaceship() {
    document.getElementById('spaceship').style.top = spaceship.top + "px";
    document.getElementById('spaceship').style.left = spaceship.left + "px";
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
        rockets[rocket].top = rockets[rocket].top - 8;
    }
}

function drawAliens() {
    document.getElementById('aliens').innerHTML = "";
    for (var alien = 0; alien < aliens.length; alien = alien + 1) {
        document.getElementById('aliens').innerHTML +=
            `<div class='alien' style='left:${aliens[alien].left}px; 
                top:${aliens[alien].top}px;'></div>`;
        if (aliens[alien].top >= 800 || aliens[alien].splice == aliens[8]) {
            location.reload();
        }
    }
}

function moveAliens() {
    for (var alien = 0; alien < aliens.length || aliens.left <= 1000; alien = alien + 1) {
        aliens[alien].left = aliens[alien].left + 2;
        if (aliens[alien].left >= 1000 || aliens[alien].left <= 50) {
            aliens[alien].top + 2;
            aliens[alien].left = aliens[alien].left - 2;
            break;
        }
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
    setTimeout(gameLoop, 25);
    moveRockets();
    drawRockets();
    moveAliens();
    drawAliens();
    collisionDetection();
}

gameLoop();
