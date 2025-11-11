class Tile {
    constructor(x, y, tileSize, type) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.type = type;
    }

    show() {
        switch (this.type) {
            case "grass":
                image(spritesCollection.grass, this.x, this.y);
                break;
            case "wall":
                fill(79, 55, 55);
                rect(this.x, this.y, this.tileSize, this.tileSize);
                strokeWeight(0);
                stroke(0, 0, 0);
                break;
            case "food":
                image(spritesCollection.food, this.x, this.y);
                break;
            case "stone":
                image(spritesCollection.stone, this.x, this.y);
                break;
            case "rock":
                image(spritesCollection.stone, this.x, this.y);
                break;
            case "tree":
                image(spritesCollection.stone, this.x, this.y);
                break;
            default:
                fill(79, 55, 55);
                rect(this.x, this.y, this.tileSize, this.tileSize);
                strokeWeight(0.1);
                stroke(0, 0, 0);
                break;
        }
    }
}
