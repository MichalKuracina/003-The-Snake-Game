class Snake {
  constructor(x, y, tileSize, type, snakeVector) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.type = type;
    this.snakeDirection = snakeVector;
    this.body = [{ x: this.x, y: this.y }];
  }

  update() {
    let futureX = this.body[0].x + this.snakeDirection.x * this.tileSize;
    let futureY = this.body[0].y + this.snakeDirection.y * this.tileSize;
    this.body.unshift({ x: futureX, y: futureY }); // add new head
    this.findFood();
  }

  changeDirection(newDirection) {
    this.snakeDirection = newDirection;
  }

  findFood() {
    let food = grid.filter((tile) => tile.type === "food")[0];

    if (this.body[0].x === food.x && this.body[0].y === food.y) {
      // food found -> remove old food, add new food
      grid.splice(
        grid.findIndex((v) => v.type === "food"),
        1
      );
      grid.push(new Tile(randomTile().x, randomTile().y, tileSize, "food"));
    } else {
      // food was not found -> remove tail (new head was added)
      this.body.pop();
    }
  }

  show() {
    this.body.forEach((segment) => {
      fill(0, 0, 0);
      rect(segment.x, segment.y, this.tileSize, this.tileSize);
      strokeWeight(0.1);
      stroke(0, 0, 0);
    });
  }

  checkCollision(x, y) {
    let walls = grid.filter((tile) => tile.type === "wall");
    let hit = walls.find((obj) => obj.x === x && obj.y === y);

    if (hit) {
      noLoop();
    }
  }
}
