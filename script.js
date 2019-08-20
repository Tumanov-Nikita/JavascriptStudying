const cellCountWidth = 10;
const cellCountHeight = 10;
const shipImageMultiplicator = 63;
const MakingColumns = ['','А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
let PlayerShips = [,4,3,2,1];
let EnemyShips = [4,3,2,1];
let angle = 0;
let matrix = createMatrix();
let EnemyMatrix;
let tablePlayer;
let tablePlayer2;
let remainShip;
let footer;


function *countRemainShipBlock(){
    yield 4;
    yield 3;
    yield 2;
    yield 1;
}
let countRemainShips = countRemainShipBlock();

function createMatrix() {
    var x = 10, y = 10, arr = [10];
    for (var i = 0; i < x; i++) {
        arr[i] = [10];
        for(var j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function getElement(id) {
    return document.getElementById(id);
}

function enterDroppable(elem) {
    elem.style.border = '3px solid green';
}

function enterNonDroppable(elem) {
    elem.style.border = '3px solid red';
}

function Restart() {
    tablePlayer1.remove();
    tablePlayer2.remove();
}


document.checkLocationShip = function(x, y, kx, ky, decks) {
    // зарегистрируем переменные
    var fromX, toX, fromY, toY;

    // формируем индексы начала и конца цикла для строк
    // если координата 'x' равна нулю, то это значит, что палуба расположена в самой верхней строке,
    // т. е. примыкает к верхней границе и началом цикла будет строка с индексом 0
    // в противном случае, нужно начать проверку со строки с индексом на единицу меньшим, чем у
    // исходной, т.е. находящейся выше исходной строки
    fromX = (x == 0) ? x : x - 1;
    // если условие истинно - это значит, что корабль расположен вертикально и его последняя палуба примыкает
    // к нижней границе игрового поля
    // поэтому координата 'x' последней палубы будет индексом конца цикла
    if (x + kx * decks == 10 && kx == 1) toX = x + kx * decks;
    // корабль расположен вертикально и между ним и нижней границей игрового поля есть, как минимум, ещё
    // одна строка, координата этой строки и будет индексом конца цикла
    else if (x + kx * decks < 10 && kx == 1) toX = x + kx * decks + 1;
    // корабль расположен горизонтально вдоль нижней границы игрового поля
    else if (x == 9 && kx == 0) toX = x + 1;
    // корабль расположен горизонтально где-то по середине игрового поля
    else if (x < 9 && kx == 0) toX = x + 2;

    // формируем индексы начала и конца цикла для столбцов
    // принцип такой же, как и для строк
    fromY = (y == 0) ? y : y - 1;
    if (y + ky * decks == 10 && ky == 1) toY = y + ky * decks;
    else if (y + ky * decks < 10 && ky == 1) toY = y + ky * decks + 1;
    else if (y == 9 && ky == 0) toY = y + 1;
    else if (y < 9 && ky == 0) toY = y + 2;

    // если корабль при повороте выходит за границы игрового поля
    // т.к. поворот происходит относительно первой палубы, то 
    // fromX и fromY, всегда валидны
    if (toX === undefined || toY === undefined) return false;

    // for (var i = fromX; i < toX; i++) {
    //     for (var j = fromY; j < toY; j++) {
    //         if (this.matrix[i][j] == 1) return false;
    //     }
    // }
    return true;
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
                cell.id = String(i-1)+" "+String(j-1);
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

    EnemyMatrix = createMatrix();
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

function DrawRemainShip(path , countdeck){
    remainShip = document.createElement('div');
    remainShip.className = 'remainShip';
    remainShip.id = 'remainShipBlock' + String(countRemainShips.next().value);
    let image = document.createElement('img');
    image.src =  String(path);
    image.className = 'shipImage';
    image.width = shipImageMultiplicator*countdeck;
    remainShip.width = image.width + shipImageMultiplicator;
    let dragImage = image.cloneNode(true);
    dragImage.id = 'shipImage';
    let horizontal = true;
    function Drag(e) {

        dragImage.style.position = 'absolute';
        moveAt(e);

        document.body.appendChild(dragImage);
        dragImage.style.zIndex = 1000;

        function moveAt(e) {
            if (horizontal){
                dragImage.style.left = e.pageX - 20 + 'px';
                dragImage.style.top = e.pageY - dragImage.offsetHeight / 2 - 5 + 'px';
            }
            else {
                dragImage.style.left = e.pageX - dragImage.offsetWidth / 1.5 + 'px';
                dragImage.style.top = e.pageY + dragImage.offsetWidth / 3.4 + 'px';
            }
        }

        document.onmousemove = function(e) {
            if (e.which != 0){
                moveAt(e);
                dragImage.hidden = true;
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                dragImage.hidden = false;
                if (!elemBelow) return;
                let droppableBelow = elemBelow.closest('.waterCell').id;
                let coord = droppableBelow.split(' ');
                if (horizontal){
                    if(checkLocationShip(coord[0],coord[1],0,1,countdeck)){
                        enterDroppable(getElement('shipImage'));
                    }
                    else{
                        enterNonDroppable(getElement('shipImage'));
                    }
                }
                else{
                    if(checkLocationShip(coord[0],coord[1],1,0,countdeck)){
                        enterDroppable(getElement('shipImage'));
                    }
                    else{
                        enterNonDroppable(getElement('shipImage'));
                    }
                }
            }
        }
        document.addEventListener('mousemove', onmousemove);

        dragImage.onmouseup = function() {
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            dragImage.hidden = false;
            if (!elemBelow) return;
            let droppableBelow = elemBelow.closest('.waterCell').id;
            let coord = droppableBelow.split(' ');
            if (PlayerShips[countdeck]>0){
                if (horizontal){
                    if(checkLocationShip(coord[0],coord[1],0,1,countdeck)){
                        enterDroppable(dragImage);
                        for (var i = 0; i < countdeck; i++) {
                            matrix[coord[0]][coord[1]+i] = 1;
                        }
                    }
                    else{
                        return;
                    }
                }
                else{
                    if(checkLocationShip(coord[0],coord[1],1,0,countdeck)){
                        enterDroppable(dragImage);
                        for (var i = 0; i < countdeck; i++) {
                            matrix[coord[0]+i][coord[1]] = 1;
                        }
                        PlayerShips[countdeck] -= 1;
                        getElement('remainShipBlock'+countdeck).innerHTML = PlayerShips[countdeck];
                    }
                    else{
                        return;
                    }
                }
            }
            else{
                alert('Корабли закончились');
            }
        }

        dragImage.ondragstart = function() {
            return false;
        }

        dragImage.oncontextmenu = function() {
            horizontal = !horizontal ;
            angle = (angle + 90) % 180;
            dragImage.className = "rotated" + angle;
        }

    }

    image.addEventListener("mousedown", Drag); 
    dragImage.addEventListener("mousedown", Drag);

    remainShip.appendChild(image);
    let cross = document.createElement('img');
    cross.src = 'cross.png'
    cross.className = 'cross';
    remainShip.appendChild(cross);
    let shipCount = document.createElement('p');
    shipCount.className = 'count';
    shipCount.innerHTML = PlayerShips[countdeck];
    remainShip.appendChild(shipCount);
    footer.appendChild(remainShip);
}


// Тело программы
DrawTables();
DrawFooter();


