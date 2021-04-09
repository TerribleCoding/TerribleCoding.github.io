let particles = [];
let tools = {};

function setup() {
    createCanvas(windowWidth, windowHeight);
    particleField();
    addPageElements();
}

function draw() {
    clear();
    for (let i = 0; i < particles.length; i++) {
        particles[i].show();
        particles[i].move();
        particles[i].connect(particles.slice(i));
    }
}