const gameboard = (() => {
    let _gameboard = ['', 'O', 'X', '', 'X', 'O', 'X', 'O', 'X'];
    
    // cache DOM
    let board = document.getElementById('board');

    // bind events

    createBoardButton();
    


    function createBoardButton() {
        _gameboard.forEach(createNewButton);
    };

    function createNewButton(val) {
        const newBtn = document.createElement('button');
        newBtn.classList.add('field');
        board.appendChild(newBtn)
    };



})();

const player = (symbol) => {
    return {symbol}
    
}

const game = (() => {
    const playerOne = player('X');
    const playerTwo = player('O');

    // cache DOM
    const buttons = document.querySelectorAll('.field');
    
    // bind events
    buttons.forEach(item => {
        item.addEventListener('click', () => {console.log(item)})
    })
    
    function play() {
        for (i = 1; i < 9; i++) {
            if (i % 2 === true) {
                playerTwoPlay()
            } else { 
                playerOnePlay()
            }
        }
    }

    function playerOnePlay() {
        console.log(this.buttons);
    }

    function playerChange() {
        if (player.symbol === 'X') {
            playerTw
        } else {

        }
    }
 
})();