const cellCountWidth = 10;
const cellCountHeight = 10;
const MakingColumns = ['','А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
let tablePlayer;
let tablePlayer2;

function ClearPage() {
    tablePlayer1.remove();
    tablePlayer2.remove();
}

function DrawTable(){
    tablePlayer1 = document.createElement('table');
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
    tablePlayer2 = tablePlayer1.cloneNode(true);
    tablePlayer1.after(tablePlayer2);
}

let footer = document.createElement('div');
footer.className = 'footer';

let buttonRestart = document.createElement('button');
buttonRestart.className = '.buttonRestart';
buttonRestart.addEventListener("click", ClearPage);
buttonRestart.addEventListener("click", DrawTable);
buttonRestart.innerHTML = 'Начать заново';
footer.appendChild(buttonRestart);

document.body.appendChild(footer);

DrawTable();



