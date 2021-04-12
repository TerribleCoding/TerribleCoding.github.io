let particles = [];
let db;
let tools = {};

function preload() {
    db = loadJSON("database/web-tools.json");
}

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

function addPageElements() {
    for (let i = 0; i < db.order.length; i++) {
        let item = db.order[i];
        tools[item] = new WebToolFrame(db.objects[item].name);
        tools[item].banner = db.objects[item].banner;
        tools[item].captions = db.objects[item].captions;
        tools[item].link = db.objects[item].link;
        tools[item].images.path = db.objects[item].images.path;
        tools[item].images.prefix = db.objects[item].images.prefix;
        tools[item].images.name = db.objects[item].images.name;
        tools[item].images.extension = db.objects[item].images.extension;
        tools[item].generate(document.getElementById("web-tools-container"), i % 2 === 1);
    }
}