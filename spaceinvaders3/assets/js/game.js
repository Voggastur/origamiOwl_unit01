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



const FPS = 30; // frames per second
const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
const GAME_LIVES = 3; // starting number of lives
const LASER_DIST = 0.6; // max distance laser can travel as fraction of screen width
const LASER_EXPLODE_DUR = 0.1; // duration of the lasers' explosion in seconds
const LASER_MAX = 10; // maximum number of lasers on screen at once
const LASER_SPD = 500; // speed of lasers in pixels per second
const ROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
const ROID_PTS_LGE = 20; // points scored for a large asteroid
const ROID_PTS_MED = 50; // points scored for a medium asteroid
const ROID_PTS_SML = 100; // points scored for a small asteroid
const ROID_NUM = 3; // starting number of asteroids
const ROID_SIZE = 100; // starting size of asteroids in pixels
const ROID_SPD = 50; // max starting speed of asteroids in pixels per second
const ROID_VERT = 10; // average number of vertices on each asteroid
const SAVE_KEY_SCORE = "highscore"; // save key for local storage of high score
const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds
const SHIP_SIZE = 30; // ship height in pixels
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
const SHIP_TURN_SPD = 360; // turn speed in degrees per second
const SHOW_BOUNDING = false; // show or hide collision bounding
const SHOW_CENTRE_DOT = false; // show or hide ship's centre dot
const TEXT_FADE_TIME = 2.5; // text fade time in seconds
const TEXT_SIZE = 40; // text font height in pixels

// window.location.assign(http://...game.html?score=3) ----- one way to remember score between rounds //

var score = 0;

var lasers = [];

var rockets = [];

var energy = [];

var explosions = [];

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

var alienStep = - 50;
var alienDirection = 3;

const height = $("#background").height();
const width = $("#background").width();

var spaceship = { top: 400, left: 100 };

function moveSpaceship() { // moveSpaceship() function is called every time we do a keydown in the next function, this function specifies the new top/left coordinates on screen
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
            top: spaceship.top - 75,
            left: spaceship.left
        });
        console.log("FIRE LASER");
        pushLasers();
    } else if (e.keyCode === 37) {
        spaceship.left -= 5;
        console.log("LEFT");
        moveSpaceship();
    } else if (e.keyCode === 39) {
        spaceship.left += 5;
        console.log("RIGHT");
        moveSpaceship();
    };
});

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
    for (var alien = 0; alien < aliens.length; alien += 1) {
        energy.push({
            top: aliens[0].top,
            left: aliens[0].left
        });
        console.log("FIRE BOMBS");
    };
};

function pushBombs() { // this function handles the enemy weapons
    document.getElementById("energy").innerHTML = "";
    for (var energybomb = 0; energybomb < energy.length; energybomb += 1) {
        document.getElementById("energy").innerHTML += `<div class='energybomb' style='left:${energy[energybomb].left}px;
        top:${energy[energybomb].top}px;'></div>`;
        // energyBombs are placed similarly as other weapons, but use another trigger on a setInterval(1500) at the top
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

// var explosion = document.getElementById("explosions").innerHTML += `<div class='explosion' style='left:${aliens[alien].left}px; top:${aliens[alien].top}px;'></div>`;
// var explosion = $("#explosions").innerHTML += `<div class='explosion' style='left:${aliens[alien].left}px; top:${aliens[alien].top}px;'></div>`;

function collisionDetection() {
    for (var alien = 0; alien < aliens.length; alien += 1) {
        for (var rocket = 0; rocket < rockets.length; rocket += 1) {
            if (rockets[rocket].top <= aliens[alien].top - 30 &&
                rockets[rocket].top >= aliens[alien].top - 60 &&
                rockets[rocket].left >= aliens[alien].left &&
                rockets[rocket].left <= aliens[alien].left + 20) {
                // Collision has occured, remove weapon and alien from game, increment score
                aliens.splice(alien, 2);
                rockets.splice(rocket, 1);
                console.log("ROCKETHIT");
                ++score;
                console.log(score);
                return score; // I try to return score to my variable and show it but it's not working, score keeps showing 0
            };
        };
        for (var laser = 0; laser < lasers.length; laser += 1) {
            if (lasers[laser].top <= aliens[alien].top - 30 &&
                lasers[laser].top >= aliens[alien].top - 60 &&
                lasers[laser].left >= aliens[alien].left &&
                lasers[laser].left <= aliens[alien].left + 20) {
                // Collision occured, remove weapon and alien from game, increment score
                aliens.splice(alien, 1);
                lasers.splice(laser, 1);
                console.log("LASERHIT");
                ++score;
                console.log(score);
                return score; // I try to return score to my variable and show it but it's not working, score keeps showing 0
            };
        };
    };
    // new level at alien.length == 0
    if (aliens.length == 0 || aliens.left >= width) {
        level++;
        location.reload();
        newLevel();
    }
};

function gameOver() {
    if (aliens.length == 0 ||
        spaceship.top <= energy[energybomb].top + 30 &&
        spaceship.top >= energy[energybomb].top &&
        spaceship.left >= energy[energybomb].left &&
        spaceship.left <= energy[energybomb].left + 30) {
        $(".buttoncontainer").slideDown("slow");
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
    gameOver();
    collisionDetection();
};
