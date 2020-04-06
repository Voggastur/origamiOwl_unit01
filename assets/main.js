
var hero = {
    top: 700,
    left: 550
};

var missiles = [];

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

function gameLoop() {
    setTimeout(gameLoop, 100)
    moveMissiles();
    drawMissiles();
}
gameLoop();
