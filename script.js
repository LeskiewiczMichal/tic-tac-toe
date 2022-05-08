const gameboard = (() => {
    let _gameboard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    
    // cache DOM
    let board = document.getElementById('board');

    createBoard();
    
    function createBoard() {
        _gameboard.forEach(createButtons);
    };

    function createButtons(val) {
        const newBtn = document.createElement('button');
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


    const makeBoardChanges = (e, moveCount) => {
        let button = e.target;
        let index = _gameboard.indexOf(button.getAttribute('btnnum'));
        if (moveCount % 2 == 0) {
            _gameboard[index] = 'X'
        } else {
            _gameboard[index] = 'O'
        }
        game.checkForWin(_gameboard, moveCount)
    }

    const resetBoard = () => {
        board.innerHTML = '';
        createBoard()
    }
    
    return {makeBoardChanges, resetBoard}
})();



const game = (() => {

    let player1 = 'X'
    let player2 = 'O'
    let moveCount = 1;

    bindToBoardKeys();

    function bindToBoardKeys() {
        gameboard.resetBoard()
        const buttons = document.querySelectorAll('.field');
        buttons.forEach(item => {
            item.addEventListener('click', oneMove);
        });
    }
    
    function oneMove(e) {
        let square = e.target;
        gameboard.makeBoardChanges(e, moveCount);
        bindToBoardKeys();
        moveCount++;
        square.disabled = true;
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
            alert('player one won')
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
            alert('player two won')
        } else if (moveCount === 9) {
            alert('shot')
        };
    };
    
    return {checkForWin}
})();

const displayController = (() => {

    // Cache DOM
    const pveButton = document.querySelector('#pve');
    const pvpButton = document.querySelector('#pvp');
    const playButton = document.querySelector('#play');
    let playerTwoNameInput =  document.querySelector('#playerTwoName');
    
    // Bind Events
    playButton.addEventListener('click', play);
    pvpButton.addEventListener('click', checkRadioButtons);
    pveButton.addEventListener('click', checkRadioButtons)

    function checkRadioButtons() {
        if (pvpButton.checked) {
            pvp();
        } else if (pveButton.checked) {
            pve();
        }
    }

    function play() {
        document.querySelector('#options').style.display = "none"
    }

    function pve() {
        playerTwoNameInput.classList.add('hidden')
    }

    function pvp() {
        playerTwoNameInput.classList.remove('hidden')
    }

})();