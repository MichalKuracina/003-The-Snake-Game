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
        // console.log(this.futureX);
        // console.log(this.futureY);
        // console.log(this.nextTileType);
        if (this.isCollision()) return;
        this.isFood();

        this.body.unshift({ x: this.futureX, y: this.futureY }); // add new head
        this.body.pop();
        let food = grid.filter((tile) => tile.type === "food");
        console.log(food);
        // console.log(nextTileType);
        // // console.log(this.futureX);
        // switch (nextTileType) {
        //   case "wall" || "stone" || "rock" || "tree":
        //     noLoop(); // end game
        //     break;
        //   case "grass":
        //     this.body.unshift({ x: this.futureX, y: this.futureY }); // add new head
        //     this.body.pop();
        //     break;
        //   case "food":
        //     // food found -> remove old food, add new food
        //     grid.splice(
        //       grid.findIndex((v) => v.type === "food"),
        //       1
        //     );
        //     grid.push(new Tile(randomTile().x, randomTile().y, tileSize, "food"));

        //   default:
        // this.body.pop();
        // break;
    }

    isCollision() {
        if (this.nextTileType === "wall" || this.nextTileType === "stone" || this.nextTileType === "rock" || this.nextTileType === "tree") {
            noLoop();
            return true;
        }
    }

    isFood() {
        // console.log(this.nextTileType);
        if (this.nextTileType === "food") {
            grid.splice(
                grid.findIndex((v) => v.type === "food"),
                1
            );
            grid.push(new Tile(randomTile().x, randomTile().y, tileSize, "food"));
        }
    }

    // if (
    //   nextTileType === "wall" ||
    //   nextTileType === "stone" ||
    //   nextTileType === "rock" ||
    //   nextTileType === "tree"
    // ) {
    //   noLoop(); // end game
    // } else if (nextTileType === "grass") {
    //   this.body.unshift({ x: this.futureX, y: this.futureY }); // add new head
    // } else if (nextTileType === "food") {
    //   // food found -> remove old food, add new food
    //   grid.splice(
    //     grid.findIndex((v) => v.type === "food"),
    //     1
    //   );
    //   grid.push(new Tile(randomTile().x, randomTile().y, tileSize, "food"));
    // } else {
    //   // food was not found -> remove tail (new head was added)
    //   this.body.pop();
    // }
    // // if (!this.checkCollision(this.futureX, this.futureY)) {
    // //   this.body.unshift({ x: this.futureX, y: this.futureY }); // add new head
    // //   //   return;
    // // }
    // // this.findFood();

    changeDirection(newDirection) {
        this.snakeDirection = newDirection;
    }

    //   findFood() {
    //     let food = grid.filter((tile) => tile.type === "food")[0];

    //     // if (this.checkCollision(this.futureX, this.futureY)) {
    //     if (this.body[0].x === food.x && this.body[0].y === food.y) {
    //       // food found -> remove old food, add new food
    //       grid.splice(
    //         grid.findIndex((v) => v.type === "food"),
    //         1
    //       );
    //       grid.push(new Tile(randomTile().x, randomTile().y, tileSize, "food"));
    //     } else {
    //       // food was not found -> remove tail (new head was added)
    //       this.body.pop();
    //     }
    //   }

    show() {
        this.body.forEach((segment) => {
            fill(0, 0, 0);
            rect(segment.x, segment.y, this.tileSize, this.tileSize);
            strokeWeight(0.1);
            stroke(0, 0, 0);
        });
    }

    //   checkCollision(x, y) {
    //     // let walls = grid.filter((tile) => tile.type === "wall");
    //     // let hit = walls.find((obj) => obj.x === x && obj.y === y);

    //     let tileType = grid.find((t) => t.x === x && t.y === y).type;

    //     return tileType;
    //     // console.log(tileType);
    //     // if (
    //     //   tileType === "wall" ||
    //     //   tileType === "stone" ||
    //     //   tileType === "rock" ||
    //     //   tileType === "tree"
    //     // ) {
    //     //   noLoop();
    //     //   return true;
    //     // }

    //     // if (tileType === "food") {
    //     //   return false;
    //     // }
    //   }
}
