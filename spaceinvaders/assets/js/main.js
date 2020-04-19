$("document").ready(function() {
    $(".button").click(function(){
        $(".buttoncontainer").slideUp("slow");
    });

const background = document.getElementById("background");
const width = background.innerWidth;
const height = background.innerHeight;

var spaceship = {
  top: 750,
  left: 550,
};

var explosion = document.getElementById("explosion");

var lasers = [];

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
  { left: 500, top: 100 },
  { left: 700, top: 100 },
];

document.onkeydown = function (e) {
  console.log(e.keyCode);

  if (e.keyCode === 37) {
    spaceship.left = spaceship.left - 10;
    moveSpaceship();
  } else if (e.keyCode === 39) {
    spaceship.left = spaceship.left + 10;
    moveSpaceship();
  } else if (e.keyCode === 40) {
    spaceship.top = spaceship.top + 5;
    console.log("DOWN");
    moveSpaceship();
  } else if (e.keyCode === 38) {
    spaceship.top = spaceship.top - 5;
    console.log("UP");
    moveSpaceship();
  } else if (e.keyCode === 32) {
    rockets.push({
      left: spaceship.left + 20,
      top: spaceship.top,
    });
    console.log("FIRE ROCKET");
    drawRockets();
  } else if (e.keyCode === 17) {
    lasers.push({
      left: spaceship.left,
      top: spaceship.top,
    });
    console.log("FIRE LASER");
    drawLasers();
  }
};

function moveSpaceship() {
  document.getElementById("spaceship").style.top = spaceship.top + "px";
  document.getElementById("spaceship").style.left = spaceship.left + "px";
}

function drawRockets() {
  document.getElementById("rockets").innerHTML = ""; // An empty string to put moving rocket images
  for (var rocket = 0; rocket < rockets.length; rocket = rocket + 1) {
    document.getElementById(
      "rockets"
    ).innerHTML += `<div class='rocket' style='left:${rockets[rocket].left}px; 
                top:${rockets[rocket].top}px;'></div>`;
    // rockets are pasted directly to the HTML with inline top-left styling with this for loop
  }
}

function moveRockets() {
  for (var rocket = 0; rocket < rockets.length; rocket += 1) {
    rockets[rocket].top = rockets[rocket].top - 8;
  }
}

function drawLasers() {
  document.getElementById("lasers").innerHTML = ""; // An empty string to put moving laser images
  for (var laser = 0; laser < lasers.length; laser += 1) {
    document.getElementById("lasers").innerHTML += 
    `<div class='laser' style='left:${lasers[laser].left}px;
    top:${lasers[laser].top}px;'></div>`;
    // lasers are pasted directly to the HTML with inline styling with this for loop
  }
}

function moveLasers() {
  for (var laser = 0; laser < lasers.length; laser += 1) {
    lasers[laser].top = lasers[laser].top - 14; // laser speed is set to move faster than the rockets
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

function moveAliens() {
  for (var alien = 0; alien < aliens.length; alien += 1) {
    aliens[alien].top += 1;
  }
}

function collisionDetection() {
  for (var alien = 0; alien < aliens.length; alien += 1) {
    for (var rocket = 0; rocket < rockets.length; rocket += 1) {
      if (
        rockets[rocket].top <= aliens[alien].top + 50 &&
        rockets[rocket].top >= aliens[alien].top &&
        rockets[rocket].left >= aliens[alien].left &&
        rockets[rocket].left <= aliens[alien].left + 50
      ) {
        console.log("HIT");
        aliens.splice(alien, 1);
        rockets.splice(rocket, 1);
      }
    }
    for (var laser = 0; laser < lasers.length; laser += 1) {
      if (
        lasers[laser].top <= aliens[alien].top + 50 &&
        lasers[laser].top >= aliens[alien].top &&
        lasers[laser].left >= aliens[alien].left &&
        lasers[laser].left <= aliens[alien].left + 50
      ) {
        console.log("HIT");
        aliens.splice(alien, 1); // Remove the corresponding alien when matched movement
        lasers.splice(laser, 1); // Remove the corresponding laser when matched movement
      }
    }
  }
}

function gameLoop() {
  setTimeout(gameLoop, 50);
  moveRockets();
  drawRockets();
  moveLasers();
  drawLasers();
  moveAliens();
  drawAliens();
  collisionDetection();
}

gameLoop();

});
