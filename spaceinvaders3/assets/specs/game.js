describe('Checking Parameters', function () {
    it('Push Lasers is a function', function () {
        expect(typeof pushLasers).toBe('function');
    });
    it('Move Lasers to be a Function', function () {
        expect(typeof moveLasers).toBe('function');
    });
    it('Push Rockets to be a Function', function () {
        expect(typeof pushRockets).toBe('function');
    });
    it('Move Rockets to be a Function', function () {
        expect(typeof moveRockets).toBe('function');
    });
    it('Move aliens to be a Function', function () {
        expect(typeof moveAliens).toBe('function');
    });
    it('Draw aliens to be a Function', function () {
        expect(typeof drawAliens).toBe('function');
    });
    it('Collision Detection should be a Function', function () {
        expect(typeof collisionDetection).toBe('function');
    });
    it('Score should be a number', function () {
        expect(typeof score).toBe('number');
    });
});

describe("Score Function", function () {

    it("Check score function", function () {
        var score = 5;
        expect(score).toBe(5);
    });
    it("Check score function again", function () {
        var score = 2;
        expect(score).toBe(2);
    });
});

describe("Test collisionDetection function", function () {
    var aliens = [];
    var rockets = [];

    beforeEach(function () {
        aliens[alien].top && rockets[rocket].top == 550;
        aliens[alien].left && rockets[rocket].left == 200;
    });

    afterEach(function () {
        score += 1;
    });
});
