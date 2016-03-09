/**
 * Created by Marcin on 2016-02-18.
 */
//var result = false;
var player = {p1 : 'A', p2: 'B'}
var board = [];
var result = false;
var round = 0;

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
    for (var m = 0; m < 2; m++) {
        var actPlayer;
        var enemy;
        if (round%2 === 0) {
            actPlayer = player.p1;
            enemy = player.p2;
        } else {
            actPlayer = player.p2;
            enemy = player.p1;
        }
        checkField(x, y, actPlayer, enemy);
        if (result) {
            replaceMarks(x,y, actPlayer, enemy);
            round++;
        }
    }
}

function setCounter ($element, cell) {
    $element.css('backgroundColor', cell.counter === 'A' ? 'lightblue' : cell.counter === 'B' ? 'blue' : '');
}



function checkField(row, column, player, enemy) {
    if (checkAvail(row, column)) {
        checkDirections(row, column, player, enemy);
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
function checkDirections(r, c, player, enemy) {
    if (northDirection(r,c, player, enemy)) {
        result = true;
    } else {
        if (northEastDirection(r,c, player, enemy)) {
            result = true;
        } else {
            if (eastDirection(r,c, player, enemy)) {
                result = true;
            } else {
                if (southEastDirection(r,c, player, enemy)) {
                    result = true;
                } else {
                    if (southDirection(r,c, player, enemy)) {
                        result = true;
                    } else {
                        if (southWestDirection(r,c, player, enemy)) {
                            result = true;
                        } else {
                            if (westDirection(r,c, player, enemy)) {
                                result = true;
                            } else {
                                northWestDirection(r,c, player, enemy);
                            }
                        }
                    }
                }
            }
        }
    }
}

function northDirection(wierszCN, kolumnaCN, player, enemy) {
    wierszCN--;
    if (board[wierszCN][kolumnaCN].counter === enemy) {
        result = true;
        wierszCN--;
        checkRopeN(wierszCN, kolumnaCN, player, enemy);
    } else {
        result = false
    }
    return result;
}
function northEastDirection(wierszCN, kolumnaCN, player, enemy) {
    wierszCN--;
    kolumnaCN++;
    if (board[wierszCN][kolumnaCN].counter === enemy) {
        result = true;
        wierszCN--;
        kolumnaCN++;
        checkRopeNE(wierszCN, kolumnaCN, player, enemy);
    } else {
        result = false
    }
    return result;
}
function eastDirection(wierszCN, kolumnaCN, player, enemy) {
    kolumnaCN++;
    if (board[wierszCN][kolumnaCN].counter === enemy) {
        result = true;
        kolumnaCN++;
        checkRopeE(wierszCN, kolumnaCN, player, enemy);
    } else {
        result = false;
    }
    return result;
}
function southEastDirection(wierszCN, kolumnaCN, player, enemy) {
    wierszCN++;
    kolumnaCN++;
    if (board[wierszCN][kolumnaCN].counter === enemy) {
        result = true;
        wierszCN++;
        kolumnaCN++;
        checkRopeSE(wierszCN, kolumnaCN, player, enemy);
    } else {
        result = false;
    }
    return result;
}
function southDirection(wierszCN, kolumnaCN, player, enemy) {
    wierszCN++;
    if (board[wierszCN][kolumnaCN].counter === enemy) {
        result = true;
        wierszCN++;
        checkRopeS(wierszCN, kolumnaCN, player, enemy);
    } else {
        result = false;
    }
    return result;
}
function southWestDirection(wierszCN, kolumnaCN, player, enemy) {
    wierszCN++;
    kolumnaCN--;
    if (board[wierszCN][kolumnaCN].counter === enemy) {
        result = true;
        wierszCN++;
        kolumnaCN--;
        checkRopeSW(wierszCN, kolumnaCN, player, enemy);
    } else {
        result = false;
    }
    return result;
}
function westDirection(wierszCN, kolumnaCN, player, enemy) {
    kolumnaCN--;
    if (board[wierszCN][kolumnaCN].counter === enemy) {
        result = true;
        kolumnaCN--;
        checkRopeW(wierszCN, kolumnaCN, player, enemy);
    } else {
        result = false;
    }
    return result;
}
function northWestDirection(wierszCN, kolumnaCN, player, enemy) {
    wierszCN--;
    kolumnaCN--;
    if (board[wierszCN][kolumnaCN].counter === enemy) {
        result = true;
        wierszCN--;
        kolumnaCN--;
        checkRopeNW(wierszCN, kolumnaCN, player, enemy);
    } else {
        result = false;
    }
    return result;
}

function checkRopeN(wierszCR, kolumnaCR, player, enemy) {
    while (wierszCR > 0 && board[wierszCR][kolumnaCR].counter === enemy) {
        wierszCR--;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeNE(wierszCR, kolumnaCR, player, enemy) {
    while (wierszCR > 0 && kolumnaCR < 7 && board[wierszCR][kolumnaCR].counter === enemy) {
        wierszCR--;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeE(wierszCR, kolumnaCR, player, enemy) {
    while (kolumnaCR < 7 && board[wierszCR][kolumnaCR].counter === enemy) {
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeSE(wierszCR, kolumnaCR, player, enemy) {
    while ((wierszCR < 7 || kolumnaCR < 7 )&& board[wierszCR][kolumnaCR].counter === enemy) {
        wierszCR++;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeS(wierszCR, kolumnaCR, player, enemy) {
    while (wierszCR < 7 && board[wierszCR][kolumnaCR] === enemy) {
        wierszCR++;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeSW(wierszCR, kolumnaCR, player, enemy) {
    while (kolumnaCR > 0 && wierszCR < 7 && board[wierszCR][kolumnaCR] === enemy) {
        wierszCR++;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeW(wierszCR, kolumnaCR, player, enemy) {
    while (kolumnaCR > 0 && board[wierszCR][kolumnaCR] === enemy) {
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeNW(wierszCR, kolumnaCR, player, enemy) {
    while ((kolumnaCR > 0 || wierszCR > 0 ) && board[wierszCR][kolumnaCR] === enemy) {
        wierszCR--;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}

function checkEnd(wierszCE, kolumnaCE, player, enemy) {
    if (board[wierszCE][kolumnaCE].counter === player) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function replaceMarks(wiersz, kolumna, player, enemy) {
    replaceDirections(wiersz, kolumna, player, enemy);
    board[wiersz][kolumna] = {counter: player};
}
function replaceDirections(r,c, player, enemy) {
    if (northDirection(r,c, player, enemy)) {
        changeFieldsN(r,c, player, enemy);
    }
    if (northEastDirection(r,c, player, enemy)) {
        changeFieldsNE(r,c, player, enemy);
    }
    if (eastDirection(r,c, player, enemy)) {
        changeFieldsE(r,c, player, enemy);
    }
    if (southEastDirection(r,c, player, enemy)) {
        changeFieldsSE(r,c, player, enemy);
    }
    if (southDirection(r,c, player, enemy)) {
        changeFieldsS(r,c, player, enemy);
    }
    if (southWestDirection(r,c, player, enemy)) {
        changeFieldsSW(r,c, player, enemy);
    }
    if (westDirection(r,c, player, enemy)) {
        changeFieldsW(r,c, player, enemy);
    }
    if (northWestDirection(r,c, player, enemy)) {
        changeFieldsNW(r,c, player, enemy);
    }
}

function changeFieldsN(row,column, player, enemy) {
    row--;
    while (board[row][column].counter === enemy) {
        board[row][column] = {counter: player};
        row--;
    }
}
function changeFieldsNE(row,column, player, enemy) {
    row--;
    column++;
    while (board[row][column].counter === enemy) {
        board[row][column] = {counter: player};
        row--;
        column++;
    }
}
function changeFieldsE(row,column, player, enemy) {
    column++;
    while (board[row][column].counter === enemy) {
        board[row][column] = {counter: player};
        column++;
    }
}
function changeFieldsSE(row,column, player, enemy) {
    row++;
    column++;
    while (board[row][column].counter === enemy) {
        board[row][column] = {counter: player};
        row++;
        column++;
    }
}
function changeFieldsS(row,column, player, enemy) {
    row++;
    while (board[row][column].counter === enemy) {
        board[row][column] = {counter: player};
        row++;
    }
}
function changeFieldsSW(row,column, player, enemy) {
    row++;
    column--;
    while (board[row][column].counter === enemy) {
        board[row][column] = {counter: player};
        row++;
        column--;
    }
}
function changeFieldsW(row,column, player, enemy) {
    column--;
    while (board[row][column].counter === enemy) {
        board[row][column] = {counter: player};
        column--;
    }
}
function changeFieldsNW(row,column, player, enemy) {
    row--;
    column--;
    while (board[row][column].counter === enemy) {
        board[row][column] = {counter: player};
        row--;
        column--;
    }
}

