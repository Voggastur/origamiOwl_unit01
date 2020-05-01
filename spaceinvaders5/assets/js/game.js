$(document).ready(function () {
    $(".button").click(function () {
        $(".buttoncontainer").slideUp("slow");
        $("#background").show();
        $("#score").html("Score " + score);
        setInterval(triggerBombs, 1500)
        triggerBombs();
        setInterval(gameLoop, 50);
        gameLoop();
    });
});

// window.location.assign(http://...game.html?score=3) ----- one way to remember score between rounds //

var score = 0;

var lasers = [];
var maxLasers = 5;

var rockets = [];
const maxRockets = 5;

var energy = [];
const maxEnergy = 3;

var aliens = [
    { left: 1150, top: 250, height: 30, width: 30 },
    { left: 1150, top: 300, height: 30, width: 30 },
    { left: 1150, top: 350, height: 30, width: 30 },
    { left: 1150, top: 400, height: 30, width: 30 },
    { left: 1150, top: 450, height: 30, width: 30 },
    { left: 1150, top: 500, height: 30, width: 30 },
    { left: 1150, top: 550, height: 30, width: 30 },
    { left: 1150, top: 600, height: 30, width: 30 },
    { left: 1050, top: 350, height: 30, width: 30 },
    { left: 1050, top: 400, height: 30, width: 30 },
    { left: 1050, top: 450, height: 30, width: 30 },
    { left: 1050, top: 500, height: 30, width: 30 }
];

var alienStep = - 50; // As aliens touch the boundaries on the transversal path, they will take a step -50 closer to the player
var alienDirection = 3; // Direction of aliens will switch from either +3 or -3 as they touch the boundaries

const height = $("#background").height();
const width = $("#background").width();
console.log(height, width);

var spaceship = {
    top: 400,
    left: 100,
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    lasers: [],
    rockets: []
};

$(document).keydown(function (e) {
    console.log(e.keyCode);

    if (e.keyCode === 40) {
        spaceship.top += 10;
        console.log("DOWN");
        moveSpaceship();
    } else if (e.keyCode === 38) {
        spaceship.top -= 10;
        console.log("UP");
        moveSpaceship();
    } else if (e.keyCode === 37) {
        spaceship.left -= 5;
        console.log("LEFT");
        moveSpaceship();
    } else if (e.keyCode === 39) {
        spaceship.left += 5;
        console.log("RIGHT");
        moveSpaceship();
    } else if (e.keyCode === 32) {
        rockets.push({
            top: spaceship.top - 50,
            left: spaceship.left
        });
        console.log("FIRE ROCKET");
        pushRockets();
    } else if (e.keyCode === 17) {
        lasers.push({
            top: spaceship.top - 75,
            left: spaceship.left
        });
        console.log("FIRE LASER");
        pushLasers();
    }
});

function moveSpaceship() { // moveSpaceship() function is called every time we do a keydown in the former function, this function specifies the new top/left coordinates on screen
    $("#spaceship").css("top", spaceship.top + "px");
    $("#spaceship").css("left", spaceship.left + "px");
}

function pushRockets() {
    document.getElementById("rockets").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste is made
    for (var rocket = 0; rocket < rockets.length; rocket += 1) {
        document.getElementById("rockets").innerHTML += `<div class='rocket' style='left:${rockets[rocket].left}px; top:${rockets[rocket].top}px;'></div>`;
        // rockets are pasted onto HTML using handy template literals
    };
};

function moveRockets() {
    for (var rocket = 0; rocket < rockets.length; rocket += 1) {
        rockets[rocket].left += 11; // rocket speed is slower than lasers but have a bit larger hit zone due to increased width and height, 
        // as well as (.splice alien, 2) so they will always remove 2 aliens
    };
};

function pushLasers() {
    document.getElementById("lasers").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste
    for (var laser = 0; laser < lasers.length; laser += 1) {
        document.getElementById("lasers").innerHTML += `<div class='laser' style='left:${lasers[laser].left}px; top:${lasers[laser].top}px;'></div>`;
        // lasers are pasted the same way as rockets
    };
};

function moveLasers() {
    for (var laser = 0; laser < lasers.length; laser += 1) {
        lasers[laser].left += 18; // laser speed is set to move faster than the rockets
    };
};

function triggerBombs() {
    for (var energy = 0; energybomb < energy.length; energybomb += 1) {
        energy.push({
            top: aliens[0].top,
            left: aliens[0].left
        });
        console.log("FIRE BOMBS");
    };
};

function pushBombs() { // this function handles the enemy weapons
    document.getElementById("energy").innerHTML = "";
    for (var alien = 0; alien < aliens.length; alien += 1) {
        document.getElementById("energy").innerHTML += `<div class='energybomb' style='left:${energy[energybomb].left}px;
        top:${energy[energybomb].top}px;'></div>`;
        // energyBombs are placed similarly as other weapons, but use another trigger on a setInterval at the top
    };
};

function moveBombs() {
    for (var energybomb = 0; energybomb < energy.length; energybomb += 1) {
        energy[energybomb].left -= 12; // == Alien bomb speed opposite direction
    };
};

function drawAliens() {
    document.getElementById("aliens").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste
    for (var alien = 0; alien < aliens.length; alien += 1) {
        // This for loop will repeat for as many aliens there are, in every interval
        document.getElementById("aliens").innerHTML += `<div class='alien' style='left:${aliens[alien].left}px; 
        top:${aliens[alien].top}px;'></div>`;
        // aliens are pasted directly to the HTML inside the id element #aliens which is styled as an overlay, using the position of the replaced alien
    };
};

function moveAliens() {
    for (var alien = 0; alien < aliens.length; alien += 1) {
        aliens[alien].top += alienDirection;
        if (aliens[alien].top > 775 || aliens[alien].top < 25) {
            switch (alienDirection) {
                case 3:
                    alienDirection -= 6;
                    alienAxis();
                    break;
                case -3:
                    alienDirection += 6;
                    alienAxis();
                    break;
            };
        };
    };
    function alienAxis() {
        for (var alien = 0; alien < aliens.length; alien += 1)
            aliens[alien].left += alienStep;
    };
};

function distBetweenPoints(x1, y1, x2, y2) { // Used in collisionDetection, function with advanced Maths
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

function collisionDetection() {
    for (var alien = 0; alien < aliens.length; alien += 1) {
        for (var rocket = 0; rocket < rockets.length && rocket > maxRockets; rocket += 1) {
            if (rockets[rocket].top <= aliens[alien].top - 70 &&
                rockets[rocket].top >= aliens[alien].top - 40 &&
                rockets[rocket].left >= aliens[alien].left &&
                rockets[rocket].left <= aliens[alien].left + 30) {
                // Collision has occured, remove weapon and alien from game, increment score
                aliens.splice(index, 2);
                rockets.splice(index, 1);
                console.log("ROCKETHIT");
                gameOver();
            };
        };
        for (var laser = 0; laser < lasers.length && laser > maxLasers; laser += 1) {
            if (lasers[laser].top <= aliens[alien].top -70 &&
                lasers[laser].top >= aliens[alien].top -40 &&
                lasers[laser].left >= aliens[alien].left &&
                lasers[laser].left <= aliens[alien].left + 30) {
                // Collision occured, remove weapon and alien from game, increment score
                aliens.splice(index, 1);
                lasers.splice(index, 1);
                console.log("LASERHIT");
                gameOver();
            };
        };
    };
};

function gameOver() {
    if (aliens.length == 0 ||
        spaceship.top <= energy[energybomb].top + 30 &&
        spaceship.top >= energy[energybomb].top &&
        spaceship.left >= energy[energybomb].left &&
        spaceship.left <= energy[energybomb].left + 30) {
        $(".buttoncontainer").slideDown("slow");
        $("#score").css("z-index", "5");
        $("#score").css("display", "block");
    };
};

function gameLoop() {
    moveRockets();
    pushRockets();
    moveLasers();
    pushLasers();
    moveBombs();
    pushBombs();
    moveAliens();
    drawAliens();
    collisionDetection();
};

