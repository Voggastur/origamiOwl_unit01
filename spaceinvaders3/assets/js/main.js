$(document).ready(function () {
    $(".button").click(function () {
        $(".buttoncontainer").slideUp("slow");
        $("#background").show();
        $("#score").html("Score:" + scoreCount);
        setInterval(gameLoop, 50);
        gameLoop();
    });
});

// window.location.assign(http://...game.html?score=3) ----- one way to remember score between rounds //

var scoreCount = 0;

var spaceship = {
    top: 400,
    left: 100,
};

var lasers = [];

var rockets = [];

var aliens = [
    { left: 1150, top: 250 },
    { left: 1150, top: 300 },
    { left: 1150, top: 350 },
    { left: 1150, top: 400 },
    { left: 1150, top: 450 },
    { left: 1150, top: 500 },
    { left: 1150, top: 550 },
    { left: 1150, top: 600 }
];

function moveSpaceship() {
    $("#spaceship").css("top", spaceship.top + "px");
    $("#spaceship").css("left", spaceship.left + "px");
}

$(document).keydown(function (e) {
    console.log(e.keyCode);

    if (e.keyCode === 37) {
        console.log("LEFT");
        spaceship.left = spaceship.left - 5;
        moveSpaceship();
    } else if (e.keyCode === 39) {
        console.log("RIGHT");
        spaceship.left = spaceship.left + 5;
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
    document.getElementById("rockets").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste
    for (var rocket = 0; rocket < rockets.length; rocket = rocket + 1) {
        document.getElementById(
            "rockets"
        ).innerHTML += `<div class='rocket' style='left:${rockets[rocket].left}px; 
                top:${rockets[rocket].top}px;'></div>`;
        // rockets are pasted directly onto the HTML using template literals
    }
};

function moveRockets() {
    for (var rocket = 0; rocket < rockets.length; rocket += 1) {
        rockets[rocket].left += 8;
    }
};

function drawLasers() {
    document.getElementById("lasers").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste
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
    document.getElementById("aliens").innerHTML = ""; // An empty string is set to remove the image from the last loop, before the new paste
    for (var alien = 0; alien < aliens.length; alien += 1) {
        // This for loop will draw as many aliens as there are in the array
        document.getElementById("aliens").innerHTML += `<div class='alien' style='left:${aliens[alien].left}px; 
        top:${aliens[alien].top}px;'></div>`;
        // aliens are pasted directly to the HTML inside the id element #aliens which is styled as an overlay, using the position of
    }
};

var alienStep = -25;
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
            if (rockets[rocket].left <= aliens[alien].left + 30 &&
                rockets[rocket].left >= aliens[alien].left &&
                rockets[rocket].top >= aliens[alien].top &&
                rockets[rocket].top <= aliens[alien].top + 30) {
                console.log("ROCKETHIT");
                aliens.splice(alien, 1); // Remove corresponding laser when matched
                rockets.splice(rocket, 1); // Remove corresponding laser when matched
                break;
            };
        };
        for (var laser = 0; laser < lasers.length; laser += 1) {
            if (lasers[laser].left <= aliens[alien].left + 30 &&
                lasers[laser].left >= aliens[alien].left &&
                lasers[laser].top >= aliens[alien].top &&
                lasers[laser].top <= aliens[alien].top + 30) {
                console.log("LASERHIT");
                aliens.splice(alien, 1); // Remove corresponding alien when matched
                lasers.splice(laser, 1); // Remove corresponding laser when matched
                break;
            };
        };
    };
    if (aliens[alien].length -= 1) {
        $(scoreCount).toNumber(scoreCount + 1);
        return scoreCount;
    };
};


function gameLoop() {
    moveRockets();
    drawRockets();
    moveLasers();
    drawLasers();
    moveAliens();
    drawAliens();
    collisionDetection();
};

