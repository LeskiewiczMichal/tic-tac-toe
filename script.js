const gameboard = (() => {
    // Define variables
    let _gameboard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    
    // Cache DOM
    let board = document.getElementById('board');

    createBoard();

    function createButtons(val) {
        const newBtn = document.createElement('button');
        newBtn.classList.add('fieldButton');
        if (val !== 'X' && val !== 'O') {
            newBtn.classList.add('field');
        } else if (val === 'X') {
            newBtn.classList.add(val)
        } else if (val === 'O') {
            newBtn.classList.add(val);
        }
        newBtn.setAttribute('btnNum', val)
        board.appendChild(newBtn)
    };

    // Count moves to make changes in _gameboard for every move
    const makeBoardChanges = (square, moveCount) => {
        let button = square;
        let index = _gameboard.indexOf(button.getAttribute('btnnum'));
        if (moveCount % 2 == 0) {
            _gameboard[index] = 'X'
        } else {
            _gameboard[index] = 'O'
        }
        game.bindToBoardKeys()
        game.checkForWin(_gameboard, moveCount)
    };

    function createBoard() {
        board.innerHTML = '';
        _gameboard.forEach(createButtons);
    }

    const resetBoard = () => {
        _gameboard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    }
    
    return {makeBoardChanges, createBoard, resetBoard}
})();


const game = (() => {
    // Cache DOM
    const playButton = document.querySelector('#play');
    const resetButton = document.querySelector('#reset');
    const exitButton = document.querySelector('#exit');
    const boardDisplay = document.querySelector('#boardDisplay');

    // Bind events
    playButton.addEventListener('click', clickPlay);
    resetButton.addEventListener('click', resetGame);
    exitButton.addEventListener('click', exitGame);

    // Define variables
    let playerOne;
    let playerTwo;
    let option;
    let buttons;
    let moveCount = 1;
    const nameOneDisplay = document.querySelector('#nameOneDisplay');
    const nameTwoDisplay = document.querySelector('#nameTwoDisplay');

    // Needed to play the first round
    bindToBoardKeys();

    // Takes options from control panel and stars game
    function clickPlay() {
        displayController.play();
        const players = displayController.play();
        playerOne = players.players.playerOne;
        playerTwo = players.players.playerTwo;
        option = displayController.checkGameOption();
        saveOption = displayController.checkGameOption();
        if (option === 'pve' && playerOne.input === 'O'){
            computerTurn();
        };
    };

    // Selects all available buttons and binds function
    // that makes them clickable
    function bindToBoardKeys() {
        gameboard.createBoard()
        buttons = document.querySelectorAll('.field');
        buttons.forEach(item => {
            item.addEventListener('click', move);
        });
    };

    // After the game ends it makes all buttons unclickable
    // and makes background darker
    function boardKeysAfterEnd() {
        buttons.forEach(item => {
            item.removeEventListener('click', move);
        });
        const allButtons = document.querySelectorAll('.fieldButton');
        allButtons.forEach(item => {
            item.style.backgroundColor = 'rgb(22, 114, 228)';
        });
    }
    
    // Makes a square unclickable after use,
    // it also fires function creating board changes
    // and creates new board.
    // Also checks if someone won the game. with function
    // inside makeBoardChanges
    function move(e) {
        let square = e.target;
        moveCount++;
        gameboard.makeBoardChanges(square, moveCount);
        square.disabled = true;
        if (option === 'pve') {
            computerTurn()
        };
    };

    // One random computer move, also checks if someone
    // won with makeboardchanges
    function computerTurn() {
        moveCount++;
        buttons = document.querySelectorAll('.field');
        let btnArray = Array.from(buttons);
        let square = btnArray[Math.floor(Math.random()*btnArray.length)];
        gameboard.makeBoardChanges(square, moveCount);
    };

    const checkForWin = (board, moveCount) => {
        if (
            board[0] === 'X' &
            board[1] === 'X' &
            board[2] === 'X' ||
            board[3] === 'X' &
            board[4] === 'X' &
            board[5] === 'X' ||
            board[6] === 'X' &
            board[7] === 'X' &
            board[8] === 'X' ||
            
            board[0] === 'X' &
            board[3] === 'X' &
            board[6] === 'X' ||
            board[1] === 'X' &
            board[4] === 'X' &
            board[7] === 'X' ||
            board[2] === 'X' &
            board[5] === 'X' &
            board[8] === 'X' ||

            board[0] === 'X' &
            board[4] === 'X' &
            board[8] === 'X' ||
            board[2] === 'X' &
            board[4] === 'X' &
            board[6] === 'X' 
        )  {
            if (playerOne.input === 'X') {
                boardKeysAfterEnd();
                nameOneDisplay.style.boxShadow = '0 0 20px rgb(202, 22, 22)'
            } else {
                nameTwoDisplay.style.boxShadow = '0 0 20px rgb(202, 22, 22)'
                boardKeysAfterEnd();
            }
        } else if (
            board[0] === 'O' &
            board[1] === 'O' &
            board[2] === 'O' ||
            board[3] === 'O' &
            board[4] === 'O' &
            board[5] === 'O' ||
            board[6] === 'O' &
            board[7] === 'O' &
            board[8] === 'O' ||
            
            board[0] === 'O' &
            board[3] === 'O' &
            board[6] === 'O' ||
            board[1] === 'O' &
            board[4] === 'O' &
            board[7] === 'O' ||
            board[2] === 'O' &
            board[5] === 'O' &
            board[8] === 'O' ||

            board[0] === 'O' &
            board[4] === 'O' &
            board[8] === 'O' ||
            board[2] === 'O' &
            board[4] === 'O' &
            board[6] === 'O' 
        ) {
            if (playerOne.input === 'O') {
                boardKeysAfterEnd();
                nameOneDisplay.style.boxShadow = '0 0 20px rgb(202, 22, 22)'
            } else {
                boardKeysAfterEnd();
                nameTwoDisplay.style.boxShadow = '0 0 20px rgb(202, 22, 22)'
            }
        } else if (moveCount === 10) {
            boardKeysAfterEnd();
            alert('It\'s a tie!');
        };
    };

    // Resets gameboard, movecount and sets buttons color
    // back to normal
    function resetGame() {
        gameboard.resetBoard();
        bindToBoardKeys();
        moveCount = 1;
        const allButtons = document.querySelectorAll('.fieldButton');
        allButtons.forEach(item => {
            item.style.backgroundColor = 'rgb(171, 207, 251)';
        });
        nameOneDisplay.style.boxShadow = '0 0 7px rgb(0, 0, 0)';
        nameTwoDisplay.style.boxShadow = '0 0 7px rgb(0, 0, 0)';
        if (option === 'pve' && playerOne.input === 'O') {
            computerTurn()
        }
    }

    // Resets game and shows menu
    function exitGame() {
        resetGame();
        document.querySelector('#options').style.visibility = "visible";
    };
    
    return {checkForWin, computerTurn, bindToBoardKeys};
})();

const displayController = (() => {
    // Cache DOM
    const pveButton = document.querySelector('#pve');
    const pvpButton = document.querySelector('#pvp');
    const playerOneNameInput = document.querySelector('#playerOneName');
    const playerTwoNameInput =  document.querySelector('#playerTwoName');
    const chooseX = document.querySelector('#X');
    const chooseO = document.querySelector('#O');
    const nameOneDisplay = document.querySelector('#nameOneDisplay');
    const nameTwoDisplay = document.querySelector('#nameTwoDisplay');

    // Bind Events
    pvpButton.addEventListener('click', showPlayerTwoNameInput);
    pveButton.addEventListener('click', showPlayerTwoNameInput);

    // players constructor
    const Player = (name, input) => {
        return {name, input}
    };

    function showPlayerTwoNameInput() {
        const option = checkGameOption();
        if (option === 'pvp') {
            playerTwoNameInput.classList.remove('hidden');
        } else {
            playerTwoNameInput.classList.add('hidden');
        };
    };

    function checkGameOption() {
        let option;
        if (pvpButton.checked) {
            option = 'pvp'
        } else if (pveButton.checked) {
            option = 'pve'
        };
        return option
    };

    function checkSelectedInput() {
        let input;
        if (chooseX.checked) {
            input = 'X';
        } else {
            input = 'O';
        };
        return input
    };

    const play = function play() {
        const option = checkGameOption();
        let players;
        if (option === 'pvp') {
            pvp();
            players = pvp();
        } else {
            pve();
            players = pve()
        };
        document.querySelector('#options').style.visibility = "hidden";

        return {players}
    };

    // Checks input to assign it to player,
    // creates player one and player two (computer)
    function pve() {
        const inputOne = checkSelectedInput(); 
        let inputTwo;
        if (inputOne === 'X') {
            inputTwo = 'O';
        } else {
            inputTwo = 'X';
        };
        const playerOne = Player(playerOneNameInput.value, inputOne); 
        const playerTwo = Player('Computer', inputTwo);      
        displayPlayersNames(playerOne, playerTwo);

        return {playerOne, playerTwo};
    };

    // Checks input to assign it to player,
    // creates player one and player two  
    function pvp() {
        playerTwoNameInput.classList.remove('hidden');
        const inputOne = checkSelectedInput(); 
        let inputTwo;
        if (inputOne === 'X') {
            inputTwo = 'O';
        } else {
            inputTwo = 'X';
        };
        const playerOne = Player(playerOneNameInput.value, inputOne);
        const playerTwo = Player(playerTwoNameInput.value, inputTwo);
        displayPlayersNames(playerOne, playerTwo);
        
        return {playerOne, playerTwo}
    }

    function displayPlayersNames(playerOne, playerTwo) {
        nameOneDisplay.textContent = playerOne.name;
        nameTwoDisplay.classList.remove('hidden');
        nameTwoDisplay.textContent = playerTwo.name; 
    }

    return {play, checkGameOption}
})();

// mixnmaxing