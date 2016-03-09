/**
 * Created by Marcin on 2016-02-18.
 */
//var result = false;
var board = [];

function setupGame(size) {
    createBoard(size);
    $(document).on('ready click', function () {
        var board1 = getBoard();
        var $table = createHtmlBoard(board1, setCounter, placeCounter);
        $('#othello').empty().append($table);
    });
}

function createBoard(size) {
    for (var x = 0; x < size; x++) {
        board[x] = [];
        for (var y = 0; y < size; y++) {
            board[x][y] = {};
        }
    }
    board[3][3] = {counter: 'A'};
    board[4][4] = {counter: 'A'};
    board[3][4] = {counter: 'B'};
    board[4][3] = {counter: 'B'};
}
function getBoard() {
    return board;
}
function createHtmlBoard(supBoard, paintField, klikZawodnika) {
    $table = $('<table>');
    var size = supBoard.length;
    for (var x = 0; x < size; x++) {
        $row = $('<tr>');
        for (var y = 0; y < size; y++) {
            $cell = $('<td>');
            $cell.css({
                width: 40,
                height: 40,
                border: '1px solid #000'
            });
            $cell.click({ posX: x, posY: y}, klikZawodnika);
            paintField($cell, board[x][y]);
            $row.append($cell);
        }
        $table.append($row);
    }
    return $table;
}
function placeCounter(event) {
    placePlayer(event.data.posX, event.data.posY);
}

function placePlayer(x, y) {
    console.log('Klikniecie w pole' + x + y);
    checkField(x,y);
    if (result) {
        replaceMarks(x,y);
    }
    //board[x][y] = {counter: 'A'};
}

function setCounter ($element, cell) {
    $element.css('backgroundColor', cell.counter === 'A' ? 'lightblue' : cell.counter === 'B' ? 'blue' : '');
}

var result = false;

function checkField(row, column) {
    if (checkAvail(row, column)) {
        checkDirections(row, column);
    } else {
        result = false;
    }
    return result;
}
function checkAvail(wierszCA, kolumnaCA) {
    if (board[wierszCA][kolumnaCA].counter === undefined) {
        result = true;
    } else {
        result = false;
    }
    return result;
}
function checkDirections(r, c) {
    if (northDirection(r,c)) {
        result = true;
    } else {
        if (northEastDirection(r,c)) {
            result = true;
        } else {
            if (eastDirection(r,c)) {
                result = true;
            } else {
                if (southEastDirection(r,c)) {
                    result = true;
                } else {
                    if (southDirection(r,c)) {
                        result = true;
                    } else {
                        if (southWestDirection(r,c)) {
                            result = true;
                        } else {
                            if (westDirection(r,c)) {
                                result = true;
                            } else {
                                northWestDirection(r,c);
                            }
                        }
                    }
                }
            }
        }
    }
}

function northDirection(wierszCN, kolumnaCN) {
    wierszCN--;
    if (board[wierszCN][kolumnaCN].counter === 'B') {
        result = true;
        wierszCN--;
        checkRopeN(wierszCN, kolumnaCN);
    } else {
        result = false
    }
    return result;
}
function northEastDirection(wierszCN, kolumnaCN) {
    wierszCN--;
    kolumnaCN++;
    if (board[wierszCN][kolumnaCN].counter === 'B') {
        result = true;
        wierszCN--;
        kolumnaCN++;
        checkRopeNE(wierszCN, kolumnaCN);
    } else {
        result = false
    }
    return result;
}
function eastDirection(wierszCN, kolumnaCN) {
    kolumnaCN++;
    if (board[wierszCN][kolumnaCN].counter === 'B') {
        result = true;
        kolumnaCN++;
        checkRopeE(wierszCN, kolumnaCN);
    } else {
        result = false;
    }
    return result;
}
function southEastDirection(wierszCN, kolumnaCN) {
    wierszCN++;
    kolumnaCN++;
    if (board[wierszCN][kolumnaCN].counter === 'B') {
        result = true;
        wierszCN++;
        kolumnaCN++;
        checkRopeSE(wierszCN, kolumnaCN);
    } else {
        result = false;
    }
    return result;
}
function southDirection(wierszCN, kolumnaCN) {
    wierszCN++;
    if (board[wierszCN][kolumnaCN].counter === 'B') {
        result = true;
        wierszCN++;
        checkRopeS(wierszCN, kolumnaCN);
    } else {
        result = false;
    }
    return result;
}
function southWestDirection(wierszCN, kolumnaCN) {
    wierszCN++;
    kolumnaCN--;
    if (board[wierszCN][kolumnaCN].counter === 'B') {
        result = true;
        wierszCN++;
        kolumnaCN--;
        checkRopeSW(wierszCN, kolumnaCN);
    } else {
        result = false;
    }
    return result;
}
function westDirection(wierszCN, kolumnaCN) {
    kolumnaCN--;
    if (board[wierszCN][kolumnaCN].counter === 'B') {
        result = true;
        kolumnaCN--;
        checkRopeW(wierszCN, kolumnaCN);
    } else {
        result = false;
    }
    return result;
}
function northWestDirection(wierszCN, kolumnaCN) {
    wierszCN--;
    kolumnaCN--;
    if (board[wierszCN][kolumnaCN].counter === 'B') {
        result = true;
        wierszCN--;
        kolumnaCN--;
        checkRopeNW(wierszCN, kolumnaCN);
    } else {
        result = false;
    }
    return result;
}

function checkRopeN(wierszCR, kolumnaCR) {
    while (wierszCR > 0 && board[wierszCR][kolumnaCR].counter === 'B') {
        wierszCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeNE(wierszCR, kolumnaCR) {
    while (wierszCR > 0 && kolumnaCR < 7 && board[wierszCR][kolumnaCR].counter === 'B') {
        wierszCR--;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeE(wierszCR, kolumnaCR) {
    while (kolumnaCR < 7 && board[wierszCR][kolumnaCR].counter === 'B') {
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeSE(wierszCR, kolumnaCR) {
    while ((wierszCR < 7 || kolumnaCR < 7 )&& board[wierszCR][kolumnaCR].counter === 'B') {
        wierszCR++;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeS(wierszCR, kolumnaCR) {
    while (wierszCR < 7 && board[wierszCR][kolumnaCR] === 'B') {
        wierszCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeSW(wierszCR, kolumnaCR) {
    while (kolumnaCR > 0 && wierszCR < 7 && board[wierszCR][kolumnaCR] === 'B') {
        wierszCR++;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeW(wierszCR, kolumnaCR) {
    while (kolumnaCR > 0 && board[wierszCR][kolumnaCR] === 'B') {
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeNW(wierszCR, kolumnaCR) {
    while ((kolumnaCR > 0 || wierszCR > 0 ) && board[wierszCR][kolumnaCR] === 'B') {
        wierszCR--;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}

function checkEnd(wierszCE, kolumnaCE) {
    if (board[wierszCE][kolumnaCE].counter === 'A') {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function replaceMarks(wiersz, kolumna) {
    replaceDirections(wiersz,kolumna);
    board[wiersz][kolumna] = {counter: 'A'};
}
function replaceDirections(r,c) {
    if (northDirection(r,c)) {
        changeFieldsN(r,c);
    }
    if (northEastDirection(r,c)) {
        changeFieldsNE(r,c);
    }
    if (eastDirection(r,c)) {
        changeFieldsE(r,c);
    }
    if (southEastDirection(r,c)) {
        changeFieldsSE(r,c);
    }
    if (southDirection(r,c)) {
        changeFieldsS(r,c);
    }
    if (southWestDirection(r,c)) {
        changeFieldsSW(r,c);
    }
    if (westDirection(r,c)) {
        changeFieldsW(r,c);
    }
    if (northWestDirection(r,c)) {
        changeFieldsNW(r,c);
    }
}

function changeFieldsN(row,column) {
    row--;
    while (board[row][column].counter === 'B') {
        board[row][column] = {counter: 'A'};
        row--;
    }
}
function changeFieldsNE(row,column) {
    row--;
    column++;
    while (board[row][column].counter === 'B') {
        board[row][column] = {counter: 'A'};
        row--;
        column++;
    }
}
function changeFieldsE(row,column) {
    column++;
    while (board[row][column].counter === 'B') {
        board[row][column] = {counter: 'A'};
        column++;
    }
}
function changeFieldsSE(row,column) {
    row++;
    column++;
    while (board[row][column].counter === 'B') {
        board[row][column] = {counter: 'A'};
        row++;
        column++;
    }
}
function changeFieldsS(row,column) {
    row++;
    while (board[row][column].counter === 'B') {
        board[row][column] = {counter: 'A'};
        row++;
    }
}
function changeFieldsSW(row,column) {
    row++;
    column--;
    while (board[row][column].counter === 'B') {
        board[row][column] = {counter: 'A'};
        row++;
        column--;
    }
}
function changeFieldsW(row,column) {
    column--;
    while (board[row][column].counter === 'B') {
        board[row][column] = {counter: 'A'};
        column--;
    }
}
function changeFieldsNW(row,column) {
    row--;
    column--;
    while (board[row][column].counter === 'B') {
        board[row][column] = {counter: 'A'};
        row--;
        column--;
    }
}

