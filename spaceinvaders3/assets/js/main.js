$(document).ready(function () {
    $(".button").click(function () {
        $(".buttoncontainer").slideUp("slow");
        $("#background").show();
        $("#score").html("Score " + score);
        setInterval(gameLoop, 50);
        gameLoop();
    });
});

// window.location.assign(http://...game.html?score=3) ----- one way to remember score between rounds //

var score = 0;

var lasers = [];

var rockets = [];

var aliens = [
    { left: 1150, top: 250, height: 30, width: 30 },
    { left: 1150, top: 300, height: 30, width: 30 },
    { left: 1150, top: 350, height: 30, width: 30 },
    { left: 1150, top: 400, height: 30, width: 30 },
    { left: 1150, top: 450, height: 30, width: 30 },
    { left: 1150, top: 500, height: 30, width: 30 },
    { left: 1150, top: 550, height: 30, width: 30 },
    { left: 1150, top: 600, height: 30, width: 30 }
];

var spaceship = {
    top: 400,
    left: 100,
};

function moveSpaceship() { // moveSpaceship() function is called every time we do a keydown in the next function, and this function specifies the new top/left coordinates for movement
    $("#spaceship").css("top", spaceship.top + "px");
    $("#spaceship").css("left", spaceship.left + "px");
}

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
    } else if (e.keyCode === 32) {
        rockets.push({
            top: spaceship.top - 50,
            left: spaceship.left
        });
        console.log("FIRE ROCKET");
        pushRockets();
    } else if (e.keyCode === 17) {
        lasers.push({
            top: spaceship.top - 70,
            left: spaceship.left
        });
        console.log("FIRE LASER");
        pushLasers();
    }
});

function pushRockets() {
    document.getElementById("rockets").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste is made
    for (var rocket = 0; rocket < rockets.length; rocket += 1) {
        document.getElementById(
            "rockets"
        ).innerHTML += `<div class='rocket' style='left:${rockets[rocket].left}px; 
                top:${rockets[rocket].top}px;'></div>`;
        // rockets are pasted onto HTML using handy template literals
    }
};

function moveRockets() {
    for (var rocket = 0; rocket < rockets.length; rocket += 1) {
        rockets[rocket].left += 10; // rocket speed is slower than lasers but planned to have increased damage or a splash damage zone
    }
};

function pushLasers() {
    document.getElementById("lasers").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste
    for (var laser = 0; laser < lasers.length; laser += 1) {
        document.getElementById(
            "lasers"
        ).innerHTML += `<div class='laser' style='left:${lasers[laser].left}px;
    top:${lasers[laser].top}px;'></div>`;
        // lasers are pasted the same way as rockets
    }
}

function moveLasers() {
    for (var laser = 0; laser < lasers.length; laser += 1) {
        lasers[laser].left += 14; // laser speed is set to move faster than the rockets
    }
}

function pushEnemyLasers() {
    for (var enemyLaser = 0; enemyLaser < enemyLasers.length; enemyLaser += 1) {
        (Math.random(Math.floor) + 7)
    }
};

function drawAliens() {
    document.getElementById("aliens").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste
    for (var alien = 0; alien < aliens.length; alien += 1) {
        // This for loop will repeat for as many aliens are in the array (8)
        document.getElementById("aliens").innerHTML += `<div class='alien' style='left:${aliens[alien].left}px; 
        top:${aliens[alien].top}px;'></div>`;
        // aliens are pasted directly to the HTML inside the id element #aliens which is styled as an overlay, using the position of the replaced alien
    }
};

var alienStep = -20;
var alienDirection = 2;
const height = $("#background").height();
const width = $("#background").width();

function moveAliens() {
    for (var alien = 0; alien < aliens.length; alien += 1) {
        aliens[alien].top += alienDirection;
        if (aliens[alien].top > 800 || aliens[alien].top < 0) {
            switch (alienDirection) {
                case 2:
                    alienDirection += -4;
                    alienAxis();
                    break;
                case -2:
                    alienDirection += 4;
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

function collisionDetection() {
    for (var alien = 0; alien < aliens.length; alien += 1) {
        for (var rocket = 0; rocket < rockets.length; rocket += 1) {
            if (rockets[rocket].top <= aliens[alien].top - 30 &&
                rockets[rocket].top >= aliens[alien].top &&
                rockets[rocket].left >= aliens[alien].left &&
                rockets[rocket].left <= aliens[alien].left - 30) {
                // Collision has occured, remove weapon and alien from game, add a point to score
                console.log("ROCKETHIT");
                aliens.splice(alien, 1);
                rockets.splice(rocket, 1);
                break;
            };
        };
        for (var laser = 0; laser < lasers.length; laser += 1) {
            if (lasers[laser].top <= aliens[alien].top - 30 &&
                lasers[laser].top >= aliens[alien].top &&
                lasers[laser].left >= aliens[alien].left &&
                lasers[laser].left <= aliens[alien].left - 30) {
                // Collision occured, remove weapon and alien from game, add a point to score
                console.log("LASERHIT");
                aliens.splice(alien, 1);
                lasers.splice(laser, 1);
                break;
            };
        };
    };
};

function gameLoop() {
    moveRockets();
    pushRockets();
    moveLasers();
    pushLasers();
    moveAliens();
    drawAliens();
    collisionDetection();
};
