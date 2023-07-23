import { Grid } from './grid.js';
import { Tile } from './tile.js';


const buttonClick = document.querySelector('.different__buttons');
const gameBoard = document.getElementById('game-board');
const buttons = document.querySelectorAll('.different__button');
const button4 = document.querySelector('.different__button_4');
const scoreElement = document.querySelector('.numbers__score-number');
const bestElement = document.querySelector('.numbers__best-number');
const maxElement = document.querySelector('.numbers__max-number');
const maxElementMobile = document.querySelector('.numbers__max-number-mobile');
const newGame = document.querySelector('.numbers__new-game');
const tryAgain = document.querySelector('.game-over__tryAgain');


const bestObject = {
   best3: 0,
   best4: 0,
   best5: 0,
   best6: 0,
   best7: 0,
   best8: 0
}
const maxObject = {
   max3: 0,
   max4: 0,
   max5: 0,
   max6: 0,
   max7: 0,
   max8: 0
}

bestObject.best3 = localStorage.getItem('best3')
bestObject.best4 = localStorage.getItem('best4')
bestObject.best5 = localStorage.getItem('best5')
bestObject.best6 = localStorage.getItem('best6')
bestObject.best7 = localStorage.getItem('best7')
bestObject.best8 = localStorage.getItem('best8')

maxObject.max3 = localStorage.getItem('max3')
maxObject.max4 = localStorage.getItem('max4')
maxObject.max5 = localStorage.getItem('max5')
maxObject.max6 = localStorage.getItem('max6')
maxObject.max7 = localStorage.getItem('max7')
maxObject.max8 = localStorage.getItem('max8')

let whatField = '4'

const grid = new Grid(gameBoard)
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
setupInputOnce();
let tilesDOM = document.getElementsByClassName('tile');

let score = grid.scoreSum()
scoreElement.textContent = score
bestElement.textContent = bestObject.best4 ? bestObject.best4 : 0
if (bestObject.best4 < score) {
   bestObject.best4 = score
   localStorage.setItem('best4', bestObject.best4.toString())
   bestElement.textContent = localStorage.getItem('best4')
}

let tilesArray = []
maxElementMobile.textContent = maxElement.textContent = maxObject.max4 ? maxObject.max4 : 0
for (let element of tilesDOM) {
   tilesArray.push(+element.textContent)
}
if (maxObject.max4 < Math.max(...tilesArray)) {
   maxObject.max4 = Math.max(...tilesArray)
   localStorage.setItem('max4', maxObject.max4.toString())
   maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max4')
}

button4.classList.add('active')

if ((document.documentElement.clientWidth / document.documentElement.clientHeight) < 1) {
   document.body.classList.add('adaptive-buttons')
}

let coordinatesStartX, coordinatesEndX, coordinatesStartY, coordinatesEndY
gameBoard.addEventListener('touchstart', (e) => {
   coordinatesStartX = e.touches[0].pageX
   coordinatesStartY = e.touches[0].pageY
})
gameBoard.addEventListener('touchmove', (e) => {
   e.preventDefault()
   coordinatesEndX = e.touches[0].pageX
   coordinatesEndY = e.touches[0].pageY
}, { passive: false })
gameBoard.addEventListener('touchend', async (e) => {
   if (((coordinatesStartY > coordinatesEndY) && ((coordinatesStartY - coordinatesEndY) > Math.abs(coordinatesStartX - coordinatesEndX))) && canMoveUp()) {
      await moveUp()
      const newTile = new Tile(gameBoard)
      grid.getRandomEmptyCell().linkTile(newTile)
      if ((whatField == '7' || whatField == '8' || whatField == '6') && grid.getRandomEmptyCell()) {
         const newTile2 = new Tile(gameBoard)
         grid.getRandomEmptyCell().linkTile(newTile2)
      }
      if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
         await newTile.waitForAnimationEnd()
         gameBoard.classList.add('modalTryAgain')
      }
   } else if (((coordinatesEndY > coordinatesStartY) && ((coordinatesEndY - coordinatesStartY) > Math.abs(coordinatesStartX - coordinatesEndX))) && canMoveDown()) {
      await moveDown()
      const newTile = new Tile(gameBoard)
      grid.getRandomEmptyCell().linkTile(newTile)
      if ((whatField == '7' || whatField == '8' || whatField == '6') && grid.getRandomEmptyCell()) {
         const newTile2 = new Tile(gameBoard)
         grid.getRandomEmptyCell().linkTile(newTile2)
      }
      if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
         await newTile.waitForAnimationEnd()
         gameBoard.classList.add('modalTryAgain')
      }
   } else if (((coordinatesEndX > coordinatesStartX) && ((coordinatesEndX - coordinatesStartX) > Math.abs(coordinatesStartY - coordinatesEndY))) && canMoveRight()) {
      await moveRight()
      const newTile = new Tile(gameBoard)
      grid.getRandomEmptyCell().linkTile(newTile)
      if ((whatField == '7' || whatField == '8' || whatField == '6') && grid.getRandomEmptyCell()) {
         const newTile2 = new Tile(gameBoard)
         grid.getRandomEmptyCell().linkTile(newTile2)
      }
      if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
         await newTile.waitForAnimationEnd()
         gameBoard.classList.add('modalTryAgain')
      }

   } else if (((coordinatesStartX > coordinatesEndX) && ((coordinatesStartX - coordinatesEndX) > Math.abs(coordinatesStartY - coordinatesEndY))) && canMoveLeft()) {
      await moveLeft()
      const newTile = new Tile(gameBoard)
      grid.getRandomEmptyCell().linkTile(newTile)
      if ((whatField == '7' || whatField == '8' || whatField == '6') && grid.getRandomEmptyCell()) {
         const newTile2 = new Tile(gameBoard)
         grid.getRandomEmptyCell().linkTile(newTile2)
      }
      if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
         await newTile.waitForAnimationEnd()
         gameBoard.classList.add('modalTryAgain')
      }
   }
})

newGame.addEventListener('click', (e) => {
   score = 0
   scoreElement.textContent = score
   grid.cellsRewriting(gameBoard)
   grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
   grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
   setupInputOnce()
})

tryAgain.addEventListener('click', (e) => {
   gameBoard.classList.remove('modalTryAgain')
   score = 0
   scoreElement.textContent = score
   grid.cellsRewriting(gameBoard)
   grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
   grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
   setupInputOnce()

})

buttonClick.addEventListener('click', (e) => {
   const targetEl = e.target
   if (!targetEl.classList.contains('active')) {
      let fieldNumber
      buttons.forEach(child => child.classList.remove('active'))
      if (targetEl.classList.contains('different__button_3')) {
         fieldNumber = '3'
         whatField = '3'
         bestElement.textContent = bestObject.best3 ? bestObject.best3 : 0
         maxElementMobile.textContent = maxElement.textContent = maxObject.max3 ? maxObject.max3 : 0
      } else if (targetEl.classList.contains('different__button_4')) {
         fieldNumber = '4'
         whatField = '4'
         bestElement.textContent = bestObject.best4 ? bestObject.best4 : 0
         maxElementMobile.textContent = maxElement.textContent = maxObject.max4 ? maxObject.max4 : 0
      } else if (targetEl.classList.contains('different__button_5')) {
         fieldNumber = '5'
         whatField = '5'
         bestElement.textContent = bestObject.best5 ? bestObject.best5 : 0
         maxElementMobile.textContent = maxElement.textContent = maxObject.max5 ? maxObject.max5 : 0
      } else if (targetEl.classList.contains('different__button_6')) {
         fieldNumber = '6'
         whatField = '6'
         bestElement.textContent = bestObject.best6 ? bestObject.best6 : 0
         maxElementMobile.textContent = maxElement.textContent = maxObject.max6 ? maxObject.max6 : 0
      } else if (targetEl.classList.contains('different__button_7')) {
         fieldNumber = '7'
         whatField = '7'
         bestElement.textContent = bestObject.best7 ? bestObject.best7 : 0
         maxElementMobile.textContent = maxElement.textContent = maxObject.max7 ? maxObject.max7 : 0
      } else if (targetEl.classList.contains('different__button_8')) {
         fieldNumber = '8'
         whatField = '8'
         bestElement.textContent = bestObject.best8 ? bestObject.best8 : 0
         maxElementMobile.textContent = maxElement.textContent = maxObject.max8 ? maxObject.max8 : 0
      }
      targetEl.classList.add('active')
      score = 0
      scoreElement.textContent = score
      gameBoard.style.setProperty("--cell-how", fieldNumber)
      grid.cellsRewriting(gameBoard)
      grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
      grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
      setupInputOnce()
   }
})


function setupInputOnce() {
   window.addEventListener("keydown", handleInput, { once: true })
}

async function handleInput(event) {
   switch (event.key) {
      case "ArrowUp":
         if (!canMoveUp()) {
            setupInputOnce()
            return;
         }
         await moveUp()
         break;
      case "ArrowDown":
         if (!canMoveDown()) {
            setupInputOnce()
            return;
         }
         await moveDown()
         break;
      case "ArrowLeft":
         if (!canMoveLeft()) {
            setupInputOnce()
            return;
         }
         await moveLeft()
         break;
      case "ArrowRight":
         if (!canMoveRight()) {
            setupInputOnce()
            return;
         }
         await moveRight()
         break;
      default:
         setupInputOnce()
         return;
   }

   const newTile = new Tile(gameBoard)
   grid.getRandomEmptyCell().linkTile(newTile)
   if ((whatField == '7' || whatField == '8' || whatField == '6') && grid.getRandomEmptyCell()) {
      const newTile2 = new Tile(gameBoard)
      grid.getRandomEmptyCell().linkTile(newTile2)
   }

   if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      await newTile.waitForAnimationEnd()
      gameBoard.classList.add('modalTryAgain')
      return
   }

   setupInputOnce()
}

async function moveUp() {
   await slideTiles(grid.cellsGroupedByColumn)
   score = grid.scoreSum()
   scoreElement.textContent = score
   if (whatField === '3') {
      if (bestObject.best3 < score) {
         bestObject.best3 = score
         localStorage.setItem('best3', bestObject.best3.toString())
         bestElement.textContent = localStorage.getItem('best3')
      }
      let tilesArray = []
      for (let element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max3 < Math.max(...tilesArray)) {
         maxObject.max3 = Math.max(...tilesArray)
         localStorage.setItem('max3', maxObject.max3.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max3')
      }
   } else if (whatField === '4') {
      if (bestObject.best4 < score) {
         bestObject.best4 = score
         localStorage.setItem('best4', bestObject.best4.toString())
         bestElement.textContent = localStorage.getItem('best4')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max4 < Math.max(...tilesArray)) {
         maxObject.max4 = Math.max(...tilesArray)
         localStorage.setItem('max4', maxObject.max4.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max4')
      }
   } else if (whatField === '5') {
      if (bestObject.best5 < score) {
         bestObject.best5 = score
         localStorage.setItem('best5', bestObject.best5.toString())
         bestElement.textContent = localStorage.getItem('best5')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max5 < Math.max(...tilesArray)) {
         maxObject.max5 = Math.max(...tilesArray)
         localStorage.setItem('max5', maxObject.max5.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max5')
      }
   } else if (whatField === '6') {
      if (bestObject.best6 < score) {
         bestObject.best6 = score
         localStorage.setItem('best6', bestObject.best6.toString())
         bestElement.textContent = localStorage.getItem('best6')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max6 < Math.max(...tilesArray)) {
         maxObject.max6 = Math.max(...tilesArray)
         localStorage.setItem('max6', maxObject.max6.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max6')
      }
   } else if (whatField === '7') {
      if (bestObject.best7 < score) {
         bestObject.best7 = score
         localStorage.setItem('best7', bestObject.best7.toString())
         bestElement.textContent = localStorage.getItem('best7')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max7 < Math.max(...tilesArray)) {
         maxObject.max7 = Math.max(...tilesArray)
         localStorage.setItem('max7', maxObject.max7.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max7')
      }
   } else if (whatField === '8') {
      if (bestObject.best8 < score) {
         bestObject.best8 = score
         localStorage.setItem('best8', bestObject.best8.toString())
         bestElement.textContent = localStorage.getItem('best8')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max8 < Math.max(...tilesArray)) {
         maxObject.max8 = Math.max(...tilesArray)
         localStorage.setItem('max8', maxObject.max8.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max8')
      }
   }
}

async function moveDown() {
   await slideTiles(grid.cellsGroupedByReverseColumn)
   score = grid.scoreSum()
   scoreElement.textContent = score
   if (whatField === '3') {
      if (bestObject.best3 < score) {
         bestObject.best3 = score
         localStorage.setItem('best3', bestObject.best3.toString())
         bestElement.textContent = localStorage.getItem('best3')
      }
      let tilesArray = []
      for (let element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max3 < Math.max(...tilesArray)) {
         maxObject.max3 = Math.max(...tilesArray)
         localStorage.setItem('max3', maxObject.max3.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max3')
      }
   } else if (whatField === '4') {
      if (bestObject.best4 < score) {
         bestObject.best4 = score
         localStorage.setItem('best4', bestObject.best4.toString())
         bestElement.textContent = localStorage.getItem('best4')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max4 < Math.max(...tilesArray)) {
         maxObject.max4 = Math.max(...tilesArray)
         localStorage.setItem('max4', maxObject.max4.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max4')
      }
   } else if (whatField === '5') {
      if (bestObject.best5 < score) {
         bestObject.best5 = score
         localStorage.setItem('best5', bestObject.best5.toString())
         bestElement.textContent = localStorage.getItem('best5')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max5 < Math.max(...tilesArray)) {
         maxObject.max5 = Math.max(...tilesArray)
         localStorage.setItem('max5', maxObject.max5.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max5')
      }
   } else if (whatField === '6') {
      if (bestObject.best6 < score) {
         bestObject.best6 = score
         localStorage.setItem('best6', bestObject.best6.toString())
         bestElement.textContent = localStorage.getItem('best6')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max6 < Math.max(...tilesArray)) {
         maxObject.max6 = Math.max(...tilesArray)
         localStorage.setItem('max6', maxObject.max6.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max6')
      }
   } else if (whatField === '7') {
      if (bestObject.best7 < score) {
         bestObject.best7 = score
         localStorage.setItem('best7', bestObject.best7.toString())
         bestElement.textContent = localStorage.getItem('best7')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max7 < Math.max(...tilesArray)) {
         maxObject.max7 = Math.max(...tilesArray)
         localStorage.setItem('max7', maxObject.max7.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max7')
      }
   } else if (whatField === '8') {
      if (bestObject.best8 < score) {
         bestObject.best8 = score
         localStorage.setItem('best8', bestObject.best8.toString())
         bestElement.textContent = localStorage.getItem('best8')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max8 < Math.max(...tilesArray)) {
         maxObject.max8 = Math.max(...tilesArray)
         localStorage.setItem('max8', maxObject.max8.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max8')
      }
   }
}

async function moveLeft() {
   await slideTiles(grid.cellsGroupedByRow)
   score = grid.scoreSum()
   scoreElement.textContent = score
   if (whatField === '3') {
      if (bestObject.best3 < score) {
         bestObject.best3 = score
         localStorage.setItem('best3', bestObject.best3.toString())
         bestElement.textContent = localStorage.getItem('best3')
      }
      let tilesArray = []
      for (let element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max3 < Math.max(...tilesArray)) {
         maxObject.max3 = Math.max(...tilesArray)
         localStorage.setItem('max3', maxObject.max3.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max3')
      }
   } else if (whatField === '4') {
      if (bestObject.best4 < score) {
         bestObject.best4 = score
         localStorage.setItem('best4', bestObject.best4.toString())
         bestElement.textContent = localStorage.getItem('best4')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max4 < Math.max(...tilesArray)) {
         maxObject.max4 = Math.max(...tilesArray)
         localStorage.setItem('max4', maxObject.max4.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max4')
      }
   } else if (whatField === '5') {
      if (bestObject.best5 < score) {
         bestObject.best5 = score
         localStorage.setItem('best5', bestObject.best5.toString())
         bestElement.textContent = localStorage.getItem('best5')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max5 < Math.max(...tilesArray)) {
         maxObject.max5 = Math.max(...tilesArray)
         localStorage.setItem('max5', maxObject.max5.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max5')
      }
   } else if (whatField === '6') {
      if (bestObject.best6 < score) {
         bestObject.best6 = score
         localStorage.setItem('best6', bestObject.best6.toString())
         bestElement.textContent = localStorage.getItem('best6')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max6 < Math.max(...tilesArray)) {
         maxObject.max6 = Math.max(...tilesArray)
         localStorage.setItem('max6', maxObject.max6.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max6')
      }
   } else if (whatField === '7') {
      if (bestObject.best7 < score) {
         bestObject.best7 = score
         localStorage.setItem('best7', bestObject.best7.toString())
         bestElement.textContent = localStorage.getItem('best7')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max7 < Math.max(...tilesArray)) {
         maxObject.max7 = Math.max(...tilesArray)
         localStorage.setItem('max7', maxObject.max7.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max7')
      }
   } else if (whatField === '8') {
      if (bestObject.best8 < score) {
         bestObject.best8 = score
         localStorage.setItem('best8', bestObject.best8.toString())
         bestElement.textContent = localStorage.getItem('best8')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max8 < Math.max(...tilesArray)) {
         maxObject.max8 = Math.max(...tilesArray)
         localStorage.setItem('max8', maxObject.max8.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max8')
      }
   }
}

async function moveRight() {
   await slideTiles(grid.cellsGroupedByReverseRow)
   score = grid.scoreSum()
   scoreElement.textContent = score
   if (whatField === '3') {
      if (bestObject.best3 < score) {
         bestObject.best3 = score
         localStorage.setItem('best3', bestObject.best3.toString())
         bestElement.textContent = localStorage.getItem('best3')
      }
      let tilesArray = []
      for (let element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max3 < Math.max(...tilesArray)) {
         maxObject.max3 = Math.max(...tilesArray)
         localStorage.setItem('max3', maxObject.max3.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max3')
      }
   } else if (whatField === '4') {
      if (bestObject.best4 < score) {
         bestObject.best4 = score
         localStorage.setItem('best4', bestObject.best4.toString())
         bestElement.textContent = localStorage.getItem('best4')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max4 < Math.max(...tilesArray)) {
         maxObject.max4 = Math.max(...tilesArray)
         localStorage.setItem('max4', maxObject.max4.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max4')
      }
   } else if (whatField === '5') {
      if (bestObject.best5 < score) {
         bestObject.best5 = score
         localStorage.setItem('best5', bestObject.best5.toString())
         bestElement.textContent = localStorage.getItem('best5')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max5 < Math.max(...tilesArray)) {
         maxObject.max5 = Math.max(...tilesArray)
         localStorage.setItem('max5', maxObject.max5.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max5')
      }
   } else if (whatField === '6') {
      if (bestObject.best6 < score) {
         bestObject.best6 = score
         localStorage.setItem('best6', bestObject.best6.toString())
         bestElement.textContent = localStorage.getItem('best6')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max6 < Math.max(...tilesArray)) {
         maxObject.max6 = Math.max(...tilesArray)
         localStorage.setItem('max6', maxObject.max6.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max6')
      }
   } else if (whatField === '7') {
      if (bestObject.best7 < score) {
         bestObject.best7 = score
         localStorage.setItem('best7', bestObject.best7.toString())
         bestElement.textContent = localStorage.getItem('best7')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max7 < Math.max(...tilesArray)) {
         maxObject.max7 = Math.max(...tilesArray)
         localStorage.setItem('max7', maxObject.max7.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max7')
      }
   } else if (whatField === '8') {
      if (bestObject.best8 < score) {
         bestObject.best8 = score
         localStorage.setItem('best8', bestObject.best8.toString())
         bestElement.textContent = localStorage.getItem('best8')
      }
      tilesArray = []
      for (const element of tilesDOM) {
         tilesArray.push(+element.textContent)
      }
      if (maxObject.max8 < Math.max(...tilesArray)) {
         maxObject.max8 = Math.max(...tilesArray)
         localStorage.setItem('max8', maxObject.max8.toString())
         maxElementMobile.textContent = maxElement.textContent = localStorage.getItem('max8')
      }
   }
}

async function slideTiles(groupedCells) {
   const promises = [];
   groupedCells.forEach(group => slideTilesInGroup(group, promises))

   await Promise.all(promises)

   grid.cells.forEach(cell => {
      cell.hasTileForMerge() && cell.mergeTiles()
   })
}
function slideTilesInGroup(group, promises) {
   for (let i = 1; i < group.length; i++) {
      if (group[i].isEmpty()) {
         continue;
      }
      const cellWithTile = group[i]


      let targetCell;
      let j = i - 1;
      while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
         targetCell = group[j]
         j--;
      }

      if (!targetCell) {
         continue
      }

      promises.push(cellWithTile.linkedTile.waitForTransitionEnd())

      if (targetCell.isEmpty()) {
         targetCell.linkTile(cellWithTile.linkedTile);
      } else {
         targetCell.linkTileForMerge(cellWithTile.linkedTile);
      }

      cellWithTile.unlinkTile();
   }
}
function canMoveUp() {
   return canMove(grid.cellsGroupedByColumn)
}
function canMoveDown() {
   return canMove(grid.cellsGroupedByReverseColumn)
}
function canMoveLeft() {
   return canMove(grid.cellsGroupedByRow)
}
function canMoveRight() {
   return canMove(grid.cellsGroupedByReverseRow)
}
function canMove(groupedCells) {
   return groupedCells.some(group => canMoveInGroup(group))
}

function canMoveInGroup(group) {
   return group.some((cell, index) => {
      if (index === 0) {
         return false;
      }

      if (cell.isEmpty()) {
         return false
      }

      const targetCell = group[index - 1];
      return targetCell.canAccept(cell.linkedTile)
   })
}

