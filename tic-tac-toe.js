const player = (marker) => {
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');
    const getName = () => {
        if (marker === 'O') {
            return player1.value;
        }
        if (marker === 'X') {
            return player2.value;
        }
    } 
    return {getName};
};

const game = (() => {
    let gameBoard = []; 
    const displayMarkers = (e) => {
        if (e.target.innerHTML == '') {
        const gameBoardLen = (gameBoard.length % 2 == 0)? gameBoard.push('O') : gameBoard.push('X');
        e.target.textContent = `${gameBoard[gameBoardLen-1]}`;
        };
        console.log(gameBoard);
        return {gameBoard};
    };
    const grids = document.querySelectorAll('.grid');
    const result = document.querySelector('.result');
    const cell1 = document.querySelector('.cell1');
    const cell2 = document.querySelector('.cell2');
    const cell3 = document.querySelector('.cell3');
    const cell4 = document.querySelector('.cell4');
    const cell5 = document.querySelector('.cell5');
    const cell6 = document.querySelector('.cell6');
    const cell7 = document.querySelector('.cell7');
    const cell8 = document.querySelector('.cell8');
    const cell9 = document.querySelector('.cell9');
    const winningGrids = [[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9], [cell1, cell4, cell7], [cell2, cell5, cell8], [cell3, cell6, cell9], [cell1, cell5, cell9], [cell3, cell5, cell7]];
    const gridList = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9];
    const win = () => {
        for (let i=0; i < winningGrids.length; i++) {
           if (winningGrids[i][0].innerHTML === winningGrids[i][1].innerHTML && winningGrids[i][1].innerHTML === winningGrids[i][2].innerHTML && winningGrids[i][0].innerHTML!='') {
                const winningMarker = winningGrids[i][0].innerHTML;
                const winningPlayer = player(`${winningMarker}`);
                const winner = winningPlayer.getName();
                result.textContent = `player ${winner} wins!`;
                gameBoard.length = 0;
                break;
            }
            if (gridList.every(cell => cell.innerHTML!='')){
                result.textContent = 'It\'s a tie!';
            }
        };
        return {gameBoard};
    };
    const gameRound = () => {
        grids.forEach((grid) => {
            grid.addEventListener('click', (e) => {
                displayMarkers(e);
                win();
                return;
            })
        });
        return {gameBoard};
    };
    const reset = () => {
        grids.forEach((grid) => {
            grid.innerHTML = ''; 
        });
        result.textContent = '';
        gameBoard.length = 0;
        gameBoard = [];
        return {gameBoard};
    };
    const restart = document.querySelector('.restart');
    restart.addEventListener ('click', reset); 
    gameRound(); 
    return {
        gameBoard, 
        reset, 
        gameRound,
    };
})();