const cellCountWidth = 10;
const cellCountHeight = 10;
const shipImageMultiplicator = 65;
const MakingColumns = ['','А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
let tablePlayer;
let tablePlayer2;
let remainShip;
let footer;
let PlayerShips = [,4,3,2,1];
let EnemyShips = [4,3,2,1];

function Restart() {
    tablePlayer1.remove();
    tablePlayer2.remove();
}

function DrawTables(){
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
                cellText.className = 'pCells';
                cellText.innerHTML = i;
                cell.appendChild(cellText);
            }
            else{
                cell.className = 'markingCell';                
                let cellText = document.createElement('p');
                cellText.className = 'pCells';
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

function DrawFooter(){
    footer = document.createElement('div');
    footer.className = 'footer';
    let buttonRestart = document.createElement('button');
    buttonRestart.className = 'buttonRestart';
    buttonRestart.addEventListener("click", Restart);
    buttonRestart.addEventListener("click", DrawTables);
    buttonRestart.innerHTML = 'Начать заново';
    footer.appendChild(buttonRestart);

    DrawRemainShip('4кл.png', 4);
    DrawRemainShip('3кл.png', 3);
    DrawRemainShip('2кл.png', 2);
    DrawRemainShip('1кл.png', 1);

    document.body.appendChild(footer);
}

function DrawRemainShip(path , count){
    remainShip = document.createElement('div');
    remainShip.className = 'remainShip';
    let image = document.createElement('img');
    image.src =  String(path);
    image.className = 'shipImage';
    image.width = shipImageMultiplicator*count;
    remainShip.width = image.width + shipImageMultiplicator;
    remainShip.appendChild(image);
    let cross = document.createElement('img');
    cross.src = 'C:\\Users\\Никита\\Desktop\\UCHYOBA\\3 курс\\Курсы MediaSoft\\JavaScript\\cross.png'
    cross.className = 'cross';
    remainShip.appendChild(cross);
    let shipCount = document.createElement('p');
    shipCount.className = 'count';
    shipCount.innerHTML = PlayerShips[count];
    remainShip.appendChild(shipCount);
    footer.appendChild(remainShip);
}


// Тело программы
DrawTables();
DrawFooter();


