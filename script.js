const cellCountWidth = 10;
const cellCountHeight = 10;


function GameField() {
    let tablePlayer1 = document.createElement('table');
    tablePlayer1.className = 'gameField';

    for (let i = 0; i <= cellCountHeight; i++) {
        let row = document.createElement('tr');
        tablePlayer1.appendChild(row);
        for (let j = 0; j <= cellCountWidth; j++) {
            let cell = document.createElement('td');
            tablePlayer1.appendChild(cell);
        }
    }
    document.body.appendChild(tablePlayer1);

    let tablePlayer2 = document.createElement('table');
    tablePlayer2.className = 'gameField';
    for (let i = 0; i <= cellCountHeight; i++) {
        let row = document.createElement('tr');
        tablePlayer2.appendChild(row);
        for (let j = 0; j <= cellCountWidth; j++) {
            let cell = document.createElement('td');
            tablePlayer2.appendChild(cell);
        }
    }
    document.body.appendChild(tablePlayer2);
}

GameField();