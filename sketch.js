let tileSize = 20;
let grid = [];
let snake;
let frameRateValue = 2;
let foodCount = 3;
let spritesheet;
let spritesCollection = {};

async function setup() {
    spritesheet = await loadImage("assets/art3.png");
    spritesCollection = {
        stone: spritesheet.get(0, 0, 20, 20),
        rock: spritesheet.get(20, 0, 40, 40),
        tree: spritesheet.get(0, 20, 20, 60),
        food: spritesheet.get(20, 40, 20, 20),
        grass: spritesheet.get(40, 40, 20, 20),
        wall: spritesheet.get(20, 60, 100, 20),
    };

    createCanvas(600, 600);
    frameRate(frameRateValue);
    drawGrid();

    snake = new Snake(280, 300, tileSize, "snake", createVector(1, 0));

    for (let i = 0; i < foodCount; i++) {
        randomTile().type = "food";
    }
}

function draw() {
    background(206, 217, 180);

    grid.forEach((tile) => {
        tile.show();
    });

    snake.update();
    snake.show();
}

function drawGrid() {
    for (let x = 0; x < width; x += tileSize) {
        for (let y = 0; y < height; y += tileSize) {
            if (x === 0 || x + tileSize === width || y === 0 || y + tileSize === height) {
                grid.push(new Tile(x, y, tileSize, "wall"));
            } else {
                grid.push(new Tile(x, y, tileSize, "grass"));
            }
        }
    }

    addObstacle("stone");
    addObstacle("stone");
    addObstacle("stone");
    addObstacle("stone");
    addObstacle("stone");
    addObstacle("rock");
    addObstacle("rock");
    addObstacle("rock");
    addObstacle("tree");
    addObstacle("tree");
    addObstacle("tree");
}

function addObstacle(type) {
    let br, ul, ur;
    let rndTile = randomTile();

    switch (type) {
        case "stone":
            rndTile.type = "stone";
            break;
        case "rock":
            br = grid.findIndex((t) => t.x === rndTile.x + tileSize && t.y === rndTile.y);

            ul = grid.findIndex((t) => t.x === rndTile.x && t.y === rndTile.y - tileSize);

            ur = grid.findIndex((t) => t.x === rndTile.x + tileSize && t.y === rndTile.y - tileSize);

            if (grid[ul].type !== "grass" || grid[ur].type !== "grass" || grid[br].type !== "grass") {
                addObstacle(type);
            } else {
                rndTile.type = "rock";
                grid[br].type = "rock";
                grid[ul].type = "rock";
                grid[ur].type = "rock";
            }
            break;
        case "tree":
            ul = grid.findIndex((t) => t.x === rndTile.x && t.y === rndTile.y - tileSize);

            ur = grid.findIndex((t) => t.x === rndTile.x && t.y === rndTile.y - tileSize - tileSize);

            if (grid[ul].type !== "grass" || grid[ur].type !== "grass") {
                addObstacle(type);
            } else {
                rndTile.type = "tree";
                grid[ul].type = "tree";
                grid[ur].type = "tree";
            }
            break;
        default:
            rndTile.type = "stone";
            break;
    }
}

function randomTile() {
    let playableTiles = grid.filter((tile) => tile.type === "grass" && tile.type !== "wall" && tile.type !== "stone" && tile.type !== "rock" && tile.type !== "tree");
    return random(playableTiles);
}

function keyPressed() {
    if (keyIsPressed === true) {
        if (keyCode === 38) {
            snake.changeDirection(createVector(0, -1));
        } else if (keyCode === 40) {
            snake.changeDirection(createVector(0, 1));
        } else if (keyCode === 37) {
            snake.changeDirection(createVector(-1, 0));
        } else if (keyCode === 39) {
            snake.changeDirection(createVector(1, 0));
        }
    }
}
