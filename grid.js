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
                fill(170, 204, 151);
                break;
            case "wall":
                fill(79, 55, 55);
                break;
            case "food":
                fill(255, 0, 0);
                break;
            case "stone":
                fill(79, 55, 55);
                break;
            case "rock":
                fill(99, 8, 43);
                break;
            case "tree":
                fill(24, 186, 70);
                break;
            default:
                fill(79, 55, 55);
                break;
        }

        rect(this.x, this.y, this.tileSize, this.tileSize);
        strokeWeight(0.1);
        stroke(0, 0, 0);
    }
}
