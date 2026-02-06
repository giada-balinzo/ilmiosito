let glyphs = [];
let smilePoints = [];
let hoverRadius = 80;
let repelForce = 6;
let returnForce = 0.05;

function setup() {
    createCanvas(394, 720);
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();

    createSmile();
}

function draw() {
    background(220);

    for (let g of glyphs) {
        let d = dist(mouseX, mouseY, g.x, g.y);

        // repulsione dal mouse
        if (d < hoverRadius) {
            let angle = atan2(g.y - mouseY, g.x - mouseX);
            g.vx += cos(angle) * repelForce;
            g.vy += sin(angle) * repelForce;
        }

        // ritorno alla posizione originale
        g.vx += (g.homeX - g.x) * returnForce;
        g.vy += (g.homeY - g.y) * returnForce;

        // attrito
        g.vx *= 0.85;
        g.vy *= 0.85;

        g.x += g.vx;
        g.y += g.vy;

        fill(0);
        text(g.char, g.x, g.y);
    }
}

// CREA LA FORMA DELLO SMILE
function createSmile() {
    let cx = width / 2;
    let cy = height / 2;
    let r = 120;

    // bocca (arco)
    for (let a = 0.2; a < PI - 0.2; a += 0.15) {
        let x = cx + cos(a) * r;
        let y = cy + sin(a) * r;
        addGlyph(x, y);
    }

    // occhi
    for (let i = 0; i < 10; i++) {
        addGlyph(cx - 50 + random(-5, 5), cy - 50 + random(-5, 5));
        addGlyph(cx + 50 + random(-5, 5), cy - 50 + random(-5, 5));
    }
}

// AGGIUNGE UN GLIFO
function addGlyph(x, y) {
    let arrows = [">", "<", "^", "v"];
    glyphs.push({
        x: x,
        y: y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        char: random(arrows)
    });
}
