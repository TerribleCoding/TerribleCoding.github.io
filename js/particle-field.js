let particles = [];
let tools = {};

function setup() {
    createCanvas(windowWidth, windowHeight);
    let canvasArea = width * height;
    let total = floor(canvasArea / 15000);
    for (let i = 0; i < total; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(1, 8);
        particles[i] = new Particle(x, y, r);
    }

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

class Particle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.scale = 0.5;
        this.speed = p5.Vector.random2D().mult(random(this.scale));
        this.xSpeed = this.speed.x;
        this.ySpeed = this.speed.y;
        this.connectionDistance = width / 8;
    }

    show() {
        noStroke();
        fill(255, 50);
        circle(this.x, this.y, this.r);
    }

    move() {
        if (this.x < 0 || this.x > width)
            this.xSpeed *= -1;
        if (this.y < 0 || this.y > height)
            this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    connect(others) {
        for (let p of others) {
            let d = dist(this.x, this.y, p.x, p.y);
            if (d <= this.connectionDistance) {
                stroke(255, 15);
                line(this.x, this.y, p.x, p.y);
            }
        }
    }
}