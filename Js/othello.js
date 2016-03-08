/**
 * Created by Marcin on 2016-02-18.
 */

var result = false;
var board = [];
function setupGame(size) {
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

    var $game = $('#othello').append(createHtmlBoard(board));
}

function createHtmlBoard(backGroundBoard, styleBoard) {
    $table = $('<table>');
    var size = backGroundBoard.length;
    for (var x = 0; x < size; x++) {
        $row = $('<tr>');
        for (var y = 0; y < size; y++) {
            $cell = $('<td>');
            $cell.css({
                width: 40,
                height: 40,
                border: '1px solid #000'
            });
            $row.append($cell);
        }
        $table.append($row);
    }
    return $table;
}



var result = false;
var plansza = [
    ['B', 'e', 'e', 'A', 'e', 'e', 'B', 'e'],
    ['e', 'A', 'e', 'B', 'e', 'B', 'e', 'e'],
    ['e', 'e', 'B', 'B', 'B', 'e', 'e', 'e'],
    ['B', 'B', 'B', 'e', 'B', 'B', 'B', 'B'],
    ['e', 'e', 'B', 'B', 'B', 'e', 'e', 'e'],
    ['e', 'B', 'e', 'B', 'e', 'B', 'e', 'e'],
    ['A', 'e', 'e', 'B', 'e', 'e', 'B', 'e'],
    ['e', 'e', 'e', 'B', 'e', 'e', 'e', 'B'],
];

var player1 = 'A';
var player2 = 'B';
var player;
var enemy;

function game() {
    for (var round = 0; round < 30; round++) {
        for (var i = 0; i < 2; i++) {
            if (i === 0) {
                player = player1;
                enemy = player2;
                //var r = podaj wartość wiersza;
                //var c = podaj wartość kolumny;
                play(r,c);
            } else {
                player = player2;
                enemy = player1;
                //var r = podaj wartość wiersza;
                //var c = podaj wartość kolumny;
                play(r,c);
            }
        }
    }
}


function play(r,c) {
    checkField(r,c);
    if (result) {
        replaceMarks(r,c);
    }
    return plansza;
}

function checkField(row, column) {
    if (checkAvail(row, column)) {
        checkDirections(row, column);
    } else {
        result = false;
    }
    return result;
}
function checkAvail(wierszCA, kolumnaCA) {
    if (plansza[wierszCA][kolumnaCA] === 'e') {
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
    if (plansza[wierszCN][kolumnaCN] === enemy) {
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
    if (plansza[wierszCN][kolumnaCN] === enemy) {
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
    if (plansza[wierszCN][kolumnaCN] === enemy) {
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
    if (plansza[wierszCN][kolumnaCN] === enemy) {
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
    if (plansza[wierszCN][kolumnaCN] === enemy) {
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
    if (plansza[wierszCN][kolumnaCN] === enemy) {
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
    if (plansza[wierszCN][kolumnaCN] === enemy) {
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
    if (plansza[wierszCN][kolumnaCN] === enemy) {
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
    while (wierszCR > 0 && plansza[wierszCR][kolumnaCR] === enemy) {
        wierszCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeNE(wierszCR, kolumnaCR) {
    while (wierszCR > 0 && kolumnaCR < 7 && plansza[wierszCR][kolumnaCR] === enemy) {
        wierszCR--;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeE(wierszCR, kolumnaCR) {
    while (kolumnaCR < 7 && plansza[wierszCR][kolumnaCR] === enemy) {
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeSE(wierszCR, kolumnaCR) {
    while ((wierszCR < 7 || kolumnaCR < 7 )&& plansza[wierszCR][kolumnaCR] === enemy) {
        wierszCR++;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeS(wierszCR, kolumnaCR) {
    while (wierszCR < 7 && plansza[wierszCR][kolumnaCR] === enemy) {
        wierszCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeSW(wierszCR, kolumnaCR) {
    while (kolumnaCR > 0 && wierszCR < 7 && plansza[wierszCR][kolumnaCR] === enemy) {
        wierszCR++;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeW(wierszCR, kolumnaCR) {
    while (kolumnaCR > 0 && plansza[wierszCR][kolumnaCR] === enemy) {
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeNW(wierszCR, kolumnaCR) {
    while ((kolumnaCR > 0 || wierszCR > 0 ) && plansza[wierszCR][kolumnaCR] === enemy) {
        wierszCR--;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}

function checkEnd(wierszCE, kolumnaCE) {
    if (plansza[wierszCE][kolumnaCE] === player) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function replaceMarks(wiersz, kolumna) {
    replaceDirections(wiersz,kolumna);
    plansza[wiersz][kolumna] = player;
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
    while (plansza[row][column] === enemy) {
        plansza[row][column] = player;
        row--;
    }
}
function changeFieldsNE(row,column) {
    row--;
    column++;
    while (plansza[row][column] === enemy) {
        plansza[row][column] = player;
        row--;
        column++;
    }
}
function changeFieldsE(row,column) {
    column++;
    while (plansza[row][column] === enemy) {
        plansza[row][column] = player;
        column++;
    }
}
function changeFieldsSE(row,column) {
    row++;
    column++;
    while (plansza[row][column] === enemy) {
        plansza[row][column] = player;
        row++;
        column++;
    }
}
function changeFieldsS(row,column) {
    row++;
    while (plansza[row][column] === enemy) {
        plansza[row][column] = player;
        row++;
    }
}
function changeFieldsSW(row,column) {
    row++;
    column--;
    while (plansza[row][column] === enemy) {
        plansza[row][column] = player;
        row++;
        column--;
    }
}
function changeFieldsW(row,column) {
    column--;
    while (plansza[row][column] === enemy) {
        plansza[row][column] = player;
        column--;
    }
}
function changeFieldsNW(row,column) {
    row--;
    column--;
    while (plansza[row][column] === enemy) {
        plansza[row][column] = player;
        row--;
        column--;
    }
}

