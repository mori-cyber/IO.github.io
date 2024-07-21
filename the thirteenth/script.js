const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');
const modeSelect = document.querySelectorAll('input[name="mode"]');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0 };
let gameMode = 'pvp';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWin()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.pointerEvents = 'none';

    if (checkWin()) {
        scores[currentPlayer]++;
        updateScores();
        statusText.textContent = `${currentPlayer} wins!`;
    } else if (gameState.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `It's ${currentPlayer}'s turn`;

        if (gameMode === 'pvc' && currentPlayer === 'O') {
            cpuMove();
        }
    } else {
        statusText.textContent = 'Draw!';
    }
};

const checkWin = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    currentPlayer = 'X';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
};

const updateScores = () => {
    scoreXText.textContent = scores.X;
    scoreOText.textContent = scores.O;
};

const cpuMove = () => {
    let emptyCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].style.pointerEvents = 'none';

    if (checkWin()) {
        scores.O++;
        updateScores();
        statusText.textContent = 'O wins!';
    } else if (gameState.includes('')) {
        currentPlayer = 'X';
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    } else {
        statusText.textContent = 'Draw!';
    }
};

const changeMode = (e) => {
    gameMode = e.target.value;
    resetGame();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
modeSelect.forEach(radio => radio.addEventListener('change', changeMode));

statusText.textContent = `It's ${currentPlayer}'s turn`;
