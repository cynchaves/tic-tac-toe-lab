/*
1) Define the required variables used to track the state of the game.

2) Store cached element references.

3) Upon loading, the game state should be initialized, and a function should 
   be called to render this game state.

4) The state of the game should be rendered to the user.

5) Define the required constants.

6) Handle a player clicking a square with a `handleClick` function.

7) Create Reset functionality.
*/

/*-------------------------------- Constants --------------------------------*/
// const winningCombos = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareElems = document.querySelectorAll('.sqr');
const msgElem = document.querySelector('#message');
const resetBtnElem = document.querySelector('#button');

/*-------------------------------- Functions --------------------------------*/
window.onload = (() => {
    init();
    msgElem.textContent = "Let's Play!";
});

const init = (() => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
    msgElem.textContent = 'Play Again!'
});

const render = (() => {
    updateBoard();
    updateMessage();
});

const updateBoard = (() => {
    for (let i = 0; i < board.length; i++) {
        squareElems[i].textContent = board[i];
    };
    console.log(board);
});

const updateMessage = (() => {
    if (winner === false && tie === false) {
        if (turn === 'X') {
            msgElem.textContent = "Player X's Turn";
        } else {
            msgElem.textContent = "Player O's Turn";
        }
    } else if (winner === false && tie === true) {
        msgElem.textContent = 'Tie!';
    } else if (winner === true && tie === false) {
        if (turn === 'X') {
            msgElem.textContent = 'Congratulations Player X! You Won!';
        } else {
            msgElem.textContent = 'Congratulations Player O! You Won!';
        }
    }
});

const placePiece = ((index) => {
    board[index] = turn;
});

const checkForWinner = (() => {
    if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) {
        winner = true;
    }
    else if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) {
        winner = true;
    }
    else if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) {
        winner = true;
    }
    else if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) {
        winner = true;
    }
    else if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) {
        winner = true;
    }
    else if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) {
        winner = true;
    }
    else if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
        winner = true;
    }
    else if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
        winner = true;
    };
});

const checkForTie = (() => {
    if (winner === true) {
        return;
    };
    if (!board.includes('')) {
        tie = true;
    };
});

const switchPlayerTurn = (() => {
    if (winner === true) {
        return;
    };
    for (let i = 0; i < board.length; i++)
        if (winner === false && turn === 'X') {
            turn = 'O';
        }
        else if (winner === false && turn === 'O')
            turn = 'X'
});

const handleClick = ((event) => {
    const squareIndex = event.target.id;
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
        return;
    };
    if (winner === true) {
        return;
    };
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
});

/*----------------------------- Event Listeners -----------------------------*/

document.getElementById('0').addEventListener('click', handleClick);
document.getElementById('1').addEventListener('click', handleClick);
document.getElementById('2').addEventListener('click', handleClick);
document.getElementById('3').addEventListener('click', handleClick);
document.getElementById('4').addEventListener('click', handleClick);
document.getElementById('5').addEventListener('click', handleClick);
document.getElementById('6').addEventListener('click', handleClick);
document.getElementById('7').addEventListener('click', handleClick);
document.getElementById('8').addEventListener('click', handleClick);

document.getElementById('button').addEventListener('click', init);