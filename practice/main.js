$(overlay).on("click", function () {
    $(".grid").css("background-color", "azure");
});

overlay = document.getElementById("overlay");

$(document).ready(function () {




    console.log('DOM fully loaded and parsed');

    const colorBtn = document.querySelector('.colorBtn');
    const bodyBcg = document.querySelector('body');

    const colors = ['yellow', 'red', 'green', '#3b5998'];

    colorBtn.addEventListener('click', changeColor);

    function changeColor() {
        bodyBcg.style.backgroundColor = colors[2];
    }


    const cards = [
        {
            name: 'Flask',
            img: '<i class="fas fa-flask"></i>'
        },
        {
            name: 'Flask',
            img: '<i class="fas fa-flask"></i>'
        },
        {
            name: 'Atom',
            img: '<i class="fas fa-atom"></i>'
        },
        {
            name: 'Atom',
            img: '<i class="fas fa-atom"></i>'
        },
        {
            name: 'Beer',
            img: '<i class="fas fa-beer"></i>'
        },
        {
            name: 'Beer',
            img: '<i class="fas fa-beer"></i>'
        },
        {
            name: 'Martini',
            img: '<i class="fas fa-glass-martini-alt"></i>'
        },
        {
            name: 'Martini',
            img: '<i class="fas fa-glass-martini-alt"></i>'
        },
        {
            name: 'Bug',
            img: '<i class="fas fa-bug"></i>'
        },
        {
            name: 'Bug',
            img: '<i class="fas fa-bug"></i>'
        },
        {
            name: 'Meteor',
            img: '<i class="fas fa-meteor"></i>'
        },
        {
            name: 'Meteor',
            img: '<i class="fas fa-meteor"></i>'
        },
        {
            name: 'Church',
            img: '<i class="fas fa-church"></i>'
        },
        {
            name: 'Church',
            img: '<i class="fas fa-church"></i>'
        },
        {
            name: 'Anchor',
            img: '<i class="fas fa-anchor"></i>'
        },
        {
            name: 'Anchor',
            img: '<i class="fas fa-anchor"></i>'
        }
    ];

    function ready() {
        let overlays = Array.from(document.getElementsByClassName('overlay-text'));
        let cards = Array.from(document.getElementsByClassName('card'));
        let game = new MixOrMatch(100, cards);

        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('visible');
                game.startGame();
            });
        });

        cards.forEach(card => {
            card.addEventListener('click', () => {
                game.flipCard(card);
            });
        });
    }

    cards.sort(() => 0.5 - Math.random());

    const grid = document.getElementByClassName('.grid').append($cards);
    const result = document.getElementById('result');

});

