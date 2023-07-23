import { Cell } from './cell.js';

let gameBoard = document.querySelector('#game-board')
let GRID_SIZE = window.getComputedStyle(gameBoard).getPropertyValue("--cell-how")
let CELLS_COUNT = GRID_SIZE**2

export class Grid {
  constructor(gridElement) {
    this.cells = []
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push(
        new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
      );
    }

    this.cellsGroupedByColumn = this.groupCellsByColumn()
    this.cellsGroupedByRow = this.groupCellsByRow()
    this.cellsGroupedByReverseColumn = this.cellsGroupedByColumn.map(column => [...column].reverse())
    this.cellsGroupedByReverseRow = this.cellsGroupedByRow.map(row=> [...row].reverse())
  }
  
  cellsRewriting(gridElement) {
    let gameBoard = document.querySelector('#game-board')
    let GRID_SIZE = window.getComputedStyle(gameBoard).getPropertyValue("--cell-how")
    let CELLS_COUNT = GRID_SIZE**2

    const cellsDOM = document.querySelectorAll('.cell');
    cellsDOM.forEach(el => el.remove())
    const tilesDOM = document.querySelectorAll('.tile');
    tilesDOM.forEach(el => el.remove())
    this.cells = []
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push(
        new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
        );
      }

    this.cellsGroupedByColumn = this.groupCellsByColumn()
    this.cellsGroupedByRow = this.groupCellsByRow()
    this.cellsGroupedByReverseColumn = this.cellsGroupedByColumn.map(column => [...column].reverse())
    this.cellsGroupedByReverseRow = this.cellsGroupedByRow.map(row=> [...row].reverse())
  }

  getRandomEmptyCell() {
    const emptyCells = this.cells.filter(cell => cell.isEmpty())
    const randomIndex = Math.floor(Math.random() * emptyCells.length)
    return emptyCells[randomIndex]
  }

  groupCellsByColumn() {
    return this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.y] = groupedCells[cell.y] || [];
      groupedCells[cell.y][cell.x] = cell;
      return groupedCells;
    }, [])
  }
  groupCellsByRow() {
    return this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.x] = groupedCells[cell.x] || [];
      groupedCells[cell.x][cell.y] = cell;
      return groupedCells;
    }, [])
  }

  scoreSum() {
    const niga = this.cells.reduce( (scoreO, scoreOne) => {
      scoreO += scoreOne.score
      return scoreO
    } , 0)
    return niga
  }
}