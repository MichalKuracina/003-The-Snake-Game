let tileSize = 20;
let grid = [];
let snake;

function setup() {
  createCanvas(600, 600);
  frameRate(2);
  drawGrid();

  snake = new Snake(240, 300, tileSize, "snake", createVector(1, 0));

  grid.push(new Tile(300, 300, tileSize, "food"));
  //   grid.push(new Tile(randomTile().x, randomTile().y, tileSize, "food"));
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
      if (
        x === 0 ||
        x + tileSize === width ||
        y === 0 ||
        y + tileSize === height
      ) {
        grid.push(new Tile(x, y, tileSize, "wall"));
      } else {
        grid.push(new Tile(x, y, tileSize, "grass"));
      }
    }
  }

  grid[100].type = "stone";
  grid.filter(
    (tile) => tile.x === grid[100].x + tileSize && tile.y === grid[100].y
  )[0].type = "stone";
  grid.filter(
    (tile) => tile.x === grid[100].x - tileSize && tile.y === grid[100].y
  )[0].type = "stone";
  grid.filter(
    (tile) => tile.x === grid[100].x && tile.y === grid[100].y + tileSize
  )[0].type = "stone";
  grid.filter(
    (tile) => tile.x === grid[100].x && tile.y === grid[100].y - tileSize
  )[0].type = "stone";
  //   for (i = 0; i < 10; i++) {
  //     let grasses = grid.filter((tile) => tile.type === "grass");
  //     let randomGrass = random(grasses);
  //     randomGrass.type = "stone";
  //   }
}

function randomTile() {
  let playableTiles = grid.filter(
    (tile) => tile.type === "grass" && tile.type !== "wall"
  );
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
