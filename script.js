
const gameboard = (() => {
    let _gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
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
        if (val === 'X') {
            newBtn.classList.add('X')
        } else if (val === 'O') {
            newBtn.classList.add('O');
        }
        newBtn.setAttribute('btnNum', val)
        newBtn.addEventListener('click', () => {console.log('lecgo')})
        board.appendChild(newBtn)
    };

    function checkForChanges(btn) {
        
    }



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
        item.addEventListener('click', checkForWinner);
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

    function checkForWinner(e) {
        if (
            buttons[0].getAttribute('data-val') === 'X' &
            buttons[3].getAttribute('data-val') === 'X' &
            buttons[6].getAttribute('data-val') === 'X' ||
            buttons[2].getAttribute('data-val') === 'X' &
            buttons[4].getAttribute('data-val') === 'X' &
            buttons[7].getAttribute('data-val') === 'X' ||
            buttons[3].getAttribute('data-val') === 'X' &
            buttons[5].getAttribute('data-val') === 'X' &
            buttons[8].getAttribute('data-val') === 'X' ||
            buttons[0].getAttribute('data-val') === 'X' &
            buttons[4].getAttribute('data-val') === 'X' &
            buttons[8].getAttribute('data-val') === 'X' ||
            buttons[2].getAttribute('data-val') === 'X' &
            buttons[4].getAttribute('data-val') === 'X' &
            buttons[6].getAttribute('data-val') === 'X' ||
            buttons[0].getAttribute('data-val') === 'X' &
            buttons[1].getAttribute('data-val') === 'X' &
            buttons[2].getAttribute('data-val') === 'X' ||
            buttons[3].getAttribute('data-val') === 'X' &
            buttons[4].getAttribute('data-val') === 'X' &
            buttons[5].getAttribute('data-val') === 'X' ||
            buttons[6].getAttribute('data-val') === 'X' &
            buttons[7].getAttribute('data-val') === 'X' &
            buttons[8].getAttribute('data-val') === 'X' 
        ) {
            console.log('player one won')
        } else if (
            buttons[0].getAttribute('data-val') === 'O' &
            buttons[3].getAttribute('data-val') === 'O' &
            buttons[6].getAttribute('data-val') === 'O' ||
            buttons[2].getAttribute('data-val') === 'O' &
            buttons[4].getAttribute('data-val') === 'O' &
            buttons[7].getAttribute('data-val') === 'O' ||
            buttons[3].getAttribute('data-val') === 'O' &
            buttons[5].getAttribute('data-val') === 'O' &
            buttons[8].getAttribute('data-val') === 'O' ||
            buttons[0].getAttribute('data-val') === 'O' &
            buttons[4].getAttribute('data-val') === 'O' &
            buttons[8].getAttribute('data-val') === 'O' ||
            buttons[2].getAttribute('data-val') === 'O' &
            buttons[4].getAttribute('data-val') === 'O' &
            buttons[6].getAttribute('data-val') === 'O' ||
            buttons[0].getAttribute('data-val') === 'O' &
            buttons[1].getAttribute('data-val') === 'O' &
            buttons[2].getAttribute('data-val') === 'O' ||
            buttons[3].getAttribute('data-val') === 'O' &
            buttons[4].getAttribute('data-val') === 'O' &
            buttons[5].getAttribute('data-val') === 'O' ||
            buttons[6].getAttribute('data-val') === 'O' &
            buttons[7].getAttribute('data-val') === 'O' &
            buttons[8].getAttribute('data-val') === 'O' 
        ){
            console.log('player two won')
        }
    }

    return {checkForWinner}
})();

