// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const resolution = 10; // Size of the cells
// const cols = canvas.width / resolution;
// const rows = canvas.height / resolution;
// let grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
// let intervalId = null;

// document.getElementById('start').addEventListener('click', () => {
//     if (intervalId === null) {
//         intervalId = setInterval(update, 100);
//     }
// });

// document.getElementById('stop').addEventListener('click', () => {
//     if (intervalId !== null) {
//         clearInterval(intervalId);
//         intervalId = null;
//     }
// });

// document.getElementById('reset').addEventListener('click', () => {
//     grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
//     drawGrid();
// });

// function createGrid() {
//     for (let col = 0; col < cols; col++) {
//         for (let row = 0; row < rows; row++) {
//             grid[col][row] = Math.floor(Math.random() * 2);
//         }
//     }
// }


// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('gameCanvas');
//     const ctx = canvas.getContext('2d');

//     const automata = new Automata(ctx, canvas.width / 10, canvas.height / 10);

//     function gameLoop() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         automata.update();
//         automata.draw();
//         requestAnimationFrame(gameLoop);
//     }

//     gameLoop();
// });

// function drawGrid() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for (let col = 0; col < cols; col++) {
//         for (let row = 0; row < rows; row++) {
//             const cell = grid[col][row];
//             ctx.beginPath();
//             ctx.rect(col * resolution, row * resolution, resolution, resolution);
//             ctx.fillStyle = cell ? 'black' : 'white';
//             ctx.fill();
//             ctx.stroke();
//         }
//     }
// }

// function update() {
//     grid = nextGen(grid);
//     drawGrid();
// }

// function nextGen(grid) {
//     const nextGen = grid.map(arr => [...arr]);
//     for (let col = 0; col < grid.length; col++) {
//         for (let row = 0; row < grid[col].length; row++) {
//             const cell = grid[col][row];
//             let numNeighbors = 0;
//             for (let i = -1; i < 2; i++) {
//                 for (let j = -1; j < 2; j++) {
//                     if (i === 0 && j === 0) {
//                         continue;
//                     }
//                     const x_cell = col + i;
//                     const y_cell = row + j;
//                     if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
//                         const currentNeighbor = grid[x_cell][y_cell];
//                         numNeighbors += currentNeighbor;
//                     }
//                 }
//             }
//             // Rules of the Game of Life
//             if (cell === 1 && numNeighbors < 2) {
//                 nextGen[col][row] = 0;
//             } else if (cell === 1 && numNeighbors > 3) {
//                 nextGen[col][row] = 0;
//             } else if (cell === 0 && numNeighbors === 3) {
//                 nextGen[col][row] = 1;
//             }
//         }
//     }
//     return nextGen;
// }

// // Initialize
// createGrid();
// drawGrid();
