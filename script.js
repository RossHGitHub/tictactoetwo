const gameBoard = (()=>{


const tiles = Array.from(document.querySelectorAll('.tile'));
const clearButton = document.querySelector('#clear')
const activePlayer = document.querySelector('.activePlayer');
const announcer = document.querySelector('.announcer');

let currentPlayer= 'X';
let isGameActive= true;
let board = ['','','','','','','','',''];

const playerX_won = 'PlayerX_won';
const playerO_won = 'PlayerO_won';
const tie = 'Tie';

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i=0; i<=7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a=== ''||b===''||c===''){
            continue;
        }
        if (a===b && b===c){
            roundWon=true;
            break
        }
    }

    if (roundWon) {
        announce(currentPlayer==='x' ? playerO_won : playerX_won);
        isGameActive = false;
        return;
    }

    if (!board.includes(''))
    announce(tie);
}

const announce = (type) => {
    switch(type){
        case playerO_won:
            announcer.innerHTML='Player <span class="playerO">O</span> Won';
                break;
        
        case playerX_won:
            announcer.innerHTML='Player <span class="playerX">X</span> Won';
                break;

        case tie:

            announcer.innerText='Tie';
    }
    announcer.classList.remove('hide');

    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText==='O'){
            return false;
        }
        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }


  const changePlayer = () => {
        activePlayer.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        activePlayer.innerText=currentPlayer;
        activePlayer.classList.add(`player${currentPlayer}`);
    }

const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive){
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

const resetBoard = () => {
    board = ['','','','','','','','',''];
    isGameActive=true;
    announcer.classList.add('hide');

    if (currentPlayer==='O'){
        changePlayer();
    }
    
    tiles.forEach(tile=>{
        tile.innerText='';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}
  

tiles.forEach( (tile, index)=>{
    tile.addEventListener('click', ()=>userAction(tile, index));
});

    clearButton.addEventListener('click', resetBoard);

})();