const gameboard = (() => {
    let _gameboard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
    
    // cache DOM
    let board = document.getElementById('board');

    // bind events

    createBoardDiv();
    appendToHTML();

    function appendToHTML() {

    };

    function createBoardDiv() {
        _gameboard.forEach(createNewDiv);
    };

    function createNewDiv() {
        const newDiv = document.createElement('div');
        board.appendChild(newDiv);
    };

})();

const player = () => {

}

const displayController = (() => {

})();