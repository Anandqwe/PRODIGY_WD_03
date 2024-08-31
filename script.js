const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell clicks for Player
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

        // Player's move
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkForWinner();

        if (gameActive) {
            // After player's move, AI makes a move
            currentPlayer = 'O';
            setTimeout(aiMove, 500);  // AI delays move for realism
        }
    });
});

// Check for winner or tie
function checkForWinner() {
    let winner = null;

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
        }
    });

    if (winner) {
        gameActive = false;
        alert(`Player ${winner} wins!`);
    } else if (!board.includes('')) {
        gameActive = false;
        alert("It's a tie!");
    }
}

// AI makes a random move
function aiMove() {
    if (!gameActive) return;

    const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;
        checkForWinner();

        // Switch back to the player
        currentPlayer = 'X';
    }
}

// Reset the game
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
});
