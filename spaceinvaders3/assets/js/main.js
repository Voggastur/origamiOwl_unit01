$(document).ready(function () {
    $(".button").click(function () {
        $(".buttoncontainer").slideUp("slow");
        $("#background").show();
        setInterval(gameLoop, 50);
        gameLoop();
    });
});

var spaceship = {
    top: 400,
    left: 100,
};

var lasers = [];

var rockets = [];

var aliens = [
    { left: 1150, top: 200 },
    { left: 1150, top: 250 },
    { left: 1150, top: 300 },
    { left: 1150, top: 350 },
    { left: 1150, top: 400 },
    { left: 1150, top: 450 },
    { left: 1150, top: 500 },
    { left: 1150, top: 550 },
    { left: 1150, top: 600 },
    { left: 1150, top: 650 }
];

var score;

function moveSpaceship() {
    $("#spaceship").css("top", spaceship.top + "px");
    $("#spaceship").css("left", spaceship.left + "px");
}

$(document).keydown(function (e) {
    console.log(e.keyCode);

    if (e.keyCode === 37) {

        spaceship.left = spaceship.left - 10;
        moveSpaceship();
    } else if (e.keyCode === 39) {
        spaceship.left = spaceship.left + 10;
        moveSpaceship();
    } else if (e.keyCode === 40) {
        spaceship.top = spaceship.top + 10;
        console.log("DOWN");
        moveSpaceship();
    } else if (e.keyCode === 38) {
        spaceship.top = spaceship.top - 10;
        console.log("UP");
        moveSpaceship();
    } else if (e.keyCode === 32) {
        rockets.push({
            top: spaceship.top - 50,
            left: spaceship.left
        });
        console.log("FIRE ROCKET");
        drawRockets();
    } else if (e.keyCode === 17) {
        lasers.push({
            top: spaceship.top - 70,
            left: spaceship.left
        });
        console.log("FIRE LASER");
        drawLasers();
    }
});

function drawRockets() {
    document.getElementById("rockets").innerHTML = ""; // An empty string to put moving rocket images
    for (var rocket = 0; rocket < rockets.length; rocket = rocket + 1) {
        document.getElementById(
            "rockets"
        ).innerHTML += `<div class='rocket' style='left:${rockets[rocket].left}px; 
                top:${rockets[rocket].top}px;'></div>`;
        // rockets are pasted directly onto the HTML using template literals
    }
}

function moveRockets() {
    for (var rocket = 0; rocket < rockets.length; rocket += 1) {
        rockets[rocket].left = rockets[rocket].left + 8;
    }
}

function drawLasers() {
    document.getElementById("lasers").innerHTML = ""; // An empty string to put moving laser images
    for (var laser = 0; laser < lasers.length; laser += 1) {
        document.getElementById(
            "lasers"
        ).innerHTML += `<div class='laser' style='left:${lasers[laser].left}px;
    top:${lasers[laser].top}px;'></div>`;
        // lasers are pasted the same way
    }
}

function moveLasers() {
    for (var laser = 0; laser < lasers.length; laser += 1) {
        lasers[laser].left = lasers[laser].left + 14; // laser speed is set to move faster than the rockets
    }
}

function drawAliens() {
    document.getElementById("aliens").innerHTML = "";
    // An empty string to put moving alien images
    for (var alien = 0; alien < aliens.length; alien += 1) {
        // This for loop will draw as many aliens as there are in the array
        document.getElementById(
            "aliens"
        ).innerHTML += `<div class='alien' style='left:${aliens[alien].left}px; 
        top:${aliens[alien].top}px;'></div>`;
        // aliens are pasted directly to the HTML inside the id element #aliens which is styled as an overlay, using the position of
    }
}

var alienStep = 5;
var alienDirection = 1;
const height = $("#background").height() - 10;
const width = $("#background").width() - 10;

function moveAliens() {
    for (var alien = 0; alien < aliens.length; alien += 1) {
        aliens[alien].top += alienDirection;
        if (aliens[alien].top > height) {
            switch (alienDirection) {
                case 1:
                    alienDirection += -2;
                    break;
                case -1:
                    alienDirection += 2;
                    break;
            }
        }
    }
}

function collisionDetection() {
    for (var alien = 0; alien < aliens.length; alien += 1) {
        for (var rocket = 0; rocket < rockets.length; rocket += 1) {
            if (
                rockets[rocket].left <= aliens[alien].left + 30 &&
                rockets[rocket].left >= aliens[alien].left &&
                rockets[rocket].top >= aliens[alien].top &&
                rockets[rocket].top <= aliens[alien].top + 30
            ) {
                console.log("HIT");
                aliens.splice(alien, 1); // Remove corresponding laser when matched
                rockets.splice(rocket, 1); // Remove corresponding laser when matched
            }
        }
        for (var laser = 0; laser < lasers.length; laser += 1) {
            if (
                lasers[laser].left <= aliens[alien].left + 30 &&
                lasers[laser].left >= aliens[alien].left &&
                lasers[laser].top >= aliens[alien].top &&
                lasers[laser].top <= aliens[alien].top + 30
            ) {
                console.log("HIT");
                aliens.slice(alien, 1); // Remove corresponding alien when matched
                lasers.slice(laser, 1); // Remove corresponding laser when matched
            }
        }
    }
}

function gameLoop() {
    moveRockets();
    drawRockets();
    moveLasers();
    drawLasers();
    moveAliens();
    drawAliens();
    collisionDetection();
}

