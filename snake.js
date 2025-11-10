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
        let tailLength = this.body.length;
        for (let i = 0; i < this.body.length; i++) {
            if (i === 0) {
                // head
                fill(0, 0, 0);
                fill("rgba(0, 0, 0, " + this.remapAplha(tailLength, i) + ")");
                rect(this.body[i].x, this.body[i].y, this.tileSize, this.tileSize);
                fill(250, 0, 0);
                rect(this.body[i].x + headBorderSize, this.body[i].y + headBorderSize, this.tileSize - headBorderSize * 2, this.tileSize - headBorderSize * 2);
            } else {
                fill(0, 0, 0);
                rect(this.body[i].x, this.body[i].y, this.tileSize, this.tileSize);
            }
            strokeWeight(0.1);
            stroke(0, 0, 0);
        }
    }

    remapAplha(tailLength, index) {
        return (1 / (tailLength - (tailLength - index))) * 1.5;
    }
}
