// let score = 0
// const scoreElement = document.querySelector('.numbers__score-number');
// scoreElement.textContent = +scoreElement.textContent + +score;
// console.log(score)

export class Cell {
   constructor(gridElement, x, y) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridElement.append(cell);
      this.x = x;
      this.y = y;
      this.score = 0
   }

   linkTile(tile) {
      tile.setXY(this.x, this.y);
      this.linkedTile = tile;
   }

   unlinkTile() {
      this.linkedTile = null;
   }

   isEmpty() {
      return !this.linkedTile;
   }

   linkTileForMerge(tile) {
      tile.setXY(this.x, this.y);
      this.linkedTileForMerge = tile;
   }

   unlinkTileForMerge() {
      this.linkedTileForMerge = null;
   }

   hasTileForMerge() {
      return !!this.linkedTileForMerge;
   }

   canAccept(newTile) {
      return (
         this.isEmpty() ||
         (!this.hasTileForMerge() && this.linkedTile.value === newTile.value)
      );
   }

   mergeTiles() {
      this.score = this.score + this.linkedTile.value

      this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMerge.value);
      this.linkedTileForMerge.removeFromDOM();
      this.unlinkTileForMerge();
   }
}