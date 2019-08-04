const cellCountWidth = 10;
const cellCountHeight = 10;
const MakingColumns = ['','А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

function GameField() {
    let tablePlayer1 = document.createElement('table');
    tablePlayer1.className = 'gameField';
    for (let i = 0; i <= cellCountHeight; i++) {
        let row = document.createElement('tr');
        tablePlayer1.appendChild(row);
        for (let j = 0; j <= cellCountWidth; j++) {
            let cell = document.createElement('td');
            if (i!=0 && j!=0){ 
                cell.className = 'waterCell';     
            }
            else if (j==0 && i!=0){
                cell.className = 'markingCell';                
                let cellText = document.createElement('p');
                cellText.innerHTML = i;
                cell.appendChild(cellText);
            }
            else{
                cell.className = 'markingCell';                
                let cellText = document.createElement('p');
                cellText.innerHTML = MakingColumns[j];
                cell.appendChild(cellText);
            }
            
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
            if (i!=0 && j!=0){ 
                cell.className = 'waterCell';     
            }
            else if (j==0 && i!=0){
                cell.className = 'markingCell';                
                let cellText = document.createElement('p');
                cellText.innerHTML = i;
                cell.appendChild(cellText);
            }
            else{
                cell.className = 'markingCell';                
                let cellText = document.createElement('p');
                cellText.innerHTML = MakingColumns[j];
                cell.appendChild(cellText);
            }
            
            tablePlayer2.appendChild(cell);
        }
    }
    document.body.appendChild(tablePlayer2);
}

GameField();

let buttonRestart = document.createElement('button');
buttonRestart.className = '.buttonRestart';
buttonRestart.onclick = GameField();
buttonRestart.innerHTML = 'Начать заново';
document.body.appendChild(buttonRestart);