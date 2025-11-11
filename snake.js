class Snake {
    constructor(x, y, tileSize, type, snakeVector) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.type = type;
        this.snakeDirection = snakeVector;
        this.body = [{ x: this.x, y: this.y }];
        this.futureX = this.x;
        this.futureY = this.y;
        this.nextTileType;
    }

    update() {
        this.futureX = this.body[0].x + this.snakeDirection.x * this.tileSize;
        this.futureY = this.body[0].y + this.snakeDirection.y * this.tileSize;

        this.nextTileType = grid.find((t) => t.x === this.futureX && t.y === this.futureY).type;

        if (this.isCollision()) return;
        this.isFood();

        this.body.unshift({ x: this.futureX, y: this.futureY }); // add new head
        this.body.pop();
    }

    isCollision() {
        if (this.nextTileType === "wall" || this.nextTileType === "stone" || this.nextTileType === "rock" || this.nextTileType === "tree") {
            noLoop();
            return true;
        }

        if (this.body.find((segment) => segment.x === this.futureX && segment.y === this.futureY)) {
            noLoop();
            return true;
        }
    }

    isFood() {
        if (this.nextTileType === "food") {
            grid.find((t) => t.x === this.futureX && t.y === this.futureY).type = "grass"; // chage eaten food to grass
            randomTile().type = "food"; // add new food

            this.body.push({ x: this.x, y: this.y });

            frameRateValue += 0.3;
            frameRate(frameRateValue);
        }
    }

    changeDirection(newDirection) {
        this.snakeDirection = newDirection;
    }

    show() {
        let headBorderSize = 2;
        for (let i = 0; i < this.body.length; i++) {
            fill(0, 0, 0);
            circle(this.body[i].x + this.tileSize / 2, this.body[i].y + this.tileSize / 2, this.tileSize);
            fill(27, 115, 24);
            circle(this.body[i].x + this.tileSize / 2, this.body[i].y + this.tileSize / 2, this.tileSize - headBorderSize);
            strokeWeight(0.1);
            stroke(0, 0, 0);

            if (i === 0) {
                fill(250, 250, 0);
                circle(this.body[i].x + 5, this.body[i].y + 6, 4);
                circle(this.body[i].x + 14, this.body[i].y + 6, 4);
                fill(250, 0, 0);
                arc(this.body[i].x + 10, this.body[i].y + 12, this.tileSize / 2, this.tileSize / 2, 0, PI);
            }
        }
    }
}
