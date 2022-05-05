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



const game = (() => {

    let player1 = 'X'
    let player2 = 'O'
    let moveCount = 1;

    // cache DOM
    const buttons = document.querySelectorAll('.field');
    
    // bind events
    buttons.forEach(item => {
        item.addEventListener('click', play);
    })
    
    function play(e) {
        let square = e.target;
        if (moveCount % 2 == 0) {
            square.dataset.val = player1;
        } else {
            square.dataset.val = 'O'
        }
        moveCount++;
        square.disabled = true;
    }

})();

