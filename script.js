    const gameboard = (() => {
        let _gameboard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
        

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
            board.appendChild(newBtn)
        };

        const checkforChanges = (e, moveCount) => {
            let button = e.target;
            let index = _gameboard.indexOf(button.getAttribute('btnnum'));
            if (moveCount % 2 == 0) {
                _gameboard[index] = 'X'
            } else {
                _gameboard[index] = 'O'
            }
            game.checkWin(_gameboard, moveCount)
        }
        
        return {checkforChanges}
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
            // item.addEventListener('click', );
        })
        
        function play(e) {
            let square = e.target;
            if (moveCount % 2 == 0) {
                square.dataset.val = player1;
            } else {
                square.dataset.val = player2;
            }
            gameboard.checkforChanges(e, moveCount);
            moveCount++;
            square.disabled = true;
        }

        const checkWin = function winCheck(board, moveCount) {
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
            }
        }
        
        return {checkWin}
    })();

