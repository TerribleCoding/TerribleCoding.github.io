function particleField() {
    let canvasArea = width * height;
    let total = floor(canvasArea / 15000);
    for (let i = 0; i < total; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(1, 4);
        particles[i] = new Particle(x, y, r);
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
        circle(this.x, this.y, this.r * 2);
    }

    move() {
        if (this.x < 0 + this.r || this.x > width - this.r) { this.xSpeed *= -1; }
        if (this.y < 0 + this.r || this.y > height - this.r) { this.ySpeed *= -1; }
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