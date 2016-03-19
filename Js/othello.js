/**
 * Created by Marcin on 2016-02-18.
 */
//var result = false;
var player = {p1 : 'B', p2: 'R'}
var board = [];
var result = false;
var round = 0;
var actPlayer = player.p1;
var enemy = player.p2;
var redResult = 0;
var blueResult = 0;

function setupGame(size) {
    createBoard(size);
    $(document).on('ready click', function () {
        var board1 = getBoard();
        var $table = createHtmlBoard(board1, setCounter, placeCounter);
        var $playing = getPlayer();
        var $red = getRed();
        var $blue = getBlue();
            $('#othello').empty().append($table);
            $('.gracz').empty().append($playing);
        $('.Czerwony').empty().append($red);
        $('.Niebieski').empty().append($blue);
    });
}
function createBoard(size) {
    for (var x = 0; x < size; x++) {
        board[x] = [];
        for (var y = 0; y < size; y++) {
            board[x][y] = {};
        }
    }
    board[3][3] = {counter: 'B'};
    board[4][4] = {counter: 'B'};
    board[3][4] = {counter: 'R'};
    board[4][3] = {counter: 'R'};
}
function getBoard() {
    return board;
}

function getRed() {
    redResult=0;
    for (var i = 0; i<8; i++) {
        for (var j = 0; j<8; j++) {
            if (board[i][j].counter === 'R') {
                redResult++;
            }
        }
    }
    return redResult;
}
function getBlue() {
    blueResult=0;
    for (var i = 0; i<8; i++) {
        for (var j = 0; j<8; j++) {
            if (board[i][j].counter === 'B') {
                blueResult++;
            }
        }
    }
    return blueResult;
}

function getPlayer() {
    return actPlayer;
}
function createHtmlBoard(supBoard, paintField, klikZawodnika) {
    $table = $('<table>');
    var size = supBoard.length;
    for (var x = 0; x < size; x++) {
        $row = $('<tr>');
        for (var y = 0; y < size; y++) {
            $cell = $('<td>');
            $cell.css({
                width: 48,
                height: 48,
                border: '1px solid #000'
            });
            if ((x+y)%2 == 0) {
                $cell.css({
                    'background-color': 'greenyellow'
                });
            } else {
                $cell.css({
                    'background-color': 'yellow'
                });
            }
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
        if (round%2 === 0) {
            actPlayer = player.p2;
            enemy = player.p1;
        } else {
            actPlayer = player.p1;
            enemy = player.p2;
        }
        console.log("Actual Player: " + actPlayer + "Pozycja: " + x + " " + y);
        checkField(x, y, actPlayer, enemy);
        if (result) {
            replaceMarks(x, y, actPlayer, enemy);
            round++;
        }
    }
}
function setCounter ($element, cell) {
    $element.css('background-image', cell.counter === 'B' ? 'url("Obrazy/Othello/cirblue.png")' : cell.counter === 'R' ? 'url("Obrazy/Othello/cirred.png")' : '');
}

function checkField(row, column, player, enemy) {
    if (checkAvail(row, column, player, enemy)) {
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
    var square = checkEdges(r, c);
    switch (square) {
        case 1 :
            if (eastDirection(r,c, player, enemy)) {
                result = true;
            } else {
                if (southEastDirection(r,c, player, enemy)) {
                    result = true;
                } else {
                    southDirection(r,c, player, enemy);
                }
            }
            break;
        case 2 :
            if (southDirection(r,c, player, enemy)) {
                result = true;
            } else {
                if (southWestDirection(r,c, player, enemy)) {
                    result = true;
                } else {
                    westDirection(r,c, player, enemy);
                }
            }
            break;
        case 3 :
            if (northDirection(r,c, player, enemy)) {
                result = true;
            } else {
                if (westDirection(r,c, player, enemy)) {
                    result = true;
                } else {
                    northWestDirection(r,c, player, enemy);
                }
            }
            break;
        case 4 :
            if (northDirection(r,c, player, enemy)) {
                result = true;
            } else {
                if (northEastDirection(r,c, player, enemy)) {
                    result = true;
                } else {
                    eastDirection(r,c, player, enemy);
                }
            }
            break;
        case 5 :
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
                            westDirection(r,c, player, enemy);
                        }
                    }
                }
            }
            break;
        case 6 :
            if (northDirection(r,c, player, enemy)) {
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
            break;
        case 7 :
            if (northDirection(r,c, player, enemy)) {
                result = true;
            } else {
                if (northEastDirection(r,c, player, enemy)) {
                    result = true;
                } else {
                    if (eastDirection(r,c, player, enemy)) {
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
            break;
        case 8 :
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
                            southDirection(r,c, player, enemy);
                        }
                    }
                }
            }
            break;
        default:
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
            break;
    }
    return result;
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
    while ((wierszCR < 7 && kolumnaCR < 7 )&& board[wierszCR][kolumnaCR].counter === enemy) {
        wierszCR++;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeS(wierszCR, kolumnaCR, player, enemy) {
    while (wierszCR < 7 && board[wierszCR][kolumnaCR].counter === enemy) {
        wierszCR++;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
    return result;
}
function checkRopeSW(wierszCR, kolumnaCR, player, enemy) {
    while (kolumnaCR > 0 && wierszCR < 7 && board[wierszCR][kolumnaCR].counter === enemy) {
        wierszCR++;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeW(wierszCR, kolumnaCR, player, enemy) {
    while (kolumnaCR > 0 && board[wierszCR][kolumnaCR].counter === enemy) {
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR, player, enemy);
}
function checkRopeNW(wierszCR, kolumnaCR, player, enemy) {
    while ((kolumnaCR > 0 && wierszCR > 0 ) && board[wierszCR][kolumnaCR].counter === enemy) {
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
    board[wiersz][kolumna] = {counter: player};
    replaceDirections(wiersz, kolumna, player, enemy);
}
function checkEdges (row, column) {
    var result = 0;
    if ((row == 0 || row == 1) && (column == 0 || column == 1)) {
        result = 1;
    } else if ((row == 0 || row ==1) && (column == 6 || column ==7)) {
        result = 2;
    } else if ((row == 6 || row ==7) && (column == 6 || column ==7)) {
        result = 3;
    } else if ((row == 6 || row ==7) && (column == 0 || column ==1)) {
        result = 4;
    } else if ((row == 0 || row ==1) && (column >= 2 && column <=5)) {
        result = 5;
    } else if ((row >= 2 && row <=5) && (column == 6 || column ==7)) {
        result = 6;
    } else if ((row == 6 || row ==7) && (column >= 2 && column <=5)) {
        result = 7;
    } else if ((row >= 2 && row <=5) && (column == 0 || column ==1)) {
        result = 8;
    } else {
        result = 0;
    }
    return result;
}

function replaceUL(r, c, player, enemy) {
    if (eastDirection(r,c, player, enemy)) {
        changeFieldsE(r,c, player, enemy);
    }
    if (southEastDirection(r,c, player, enemy)) {
        changeFieldsSE(r,c, player, enemy);
    }
    if (southDirection(r,c, player, enemy)) {
        changeFieldsS(r,c, player, enemy);
    }
}
function replaceUR(r, c, player, enemy) {
    if (southDirection(r,c, player, enemy)) {
        changeFieldsS(r,c, player, enemy);
    }
    if (southWestDirection(r,c, player, enemy)) {
        changeFieldsSW(r,c, player, enemy);
    }
    if (westDirection(r,c, player, enemy)) {
        changeFieldsW(r,c, player, enemy);
    }
}
function replaceBR(r, c, player, enemy) {
    if (northDirection(r,c, player, enemy)) {
        changeFieldsN(r,c, player, enemy);
    }
    if (westDirection(r,c, player, enemy)) {
        changeFieldsW(r,c, player, enemy);
    }
    if (northWestDirection(r,c, player, enemy)) {
        changeFieldsNW(r,c, player, enemy);
    }
}
function replaceBL(r, c, player, enemy) {
    if (northDirection(r,c, player, enemy)) {
        changeFieldsN(r,c, player, enemy);
    }
    if (northEastDirection(r,c, player, enemy)) {
        changeFieldsNE(r,c, player, enemy);
    }
    if (eastDirection(r,c, player, enemy)) {
        changeFieldsE(r,c, player, enemy);
    }
}
function replaceU(r, c, player, enemy) {
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
}
function replaceR(r, c, player, enemy) {
    if (northDirection(r,c, player, enemy)) {
        changeFieldsN(r,c, player, enemy);
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
function replaceB(r, c, player, enemy) {
    if (northDirection(r,c, player, enemy)) {
        changeFieldsN(r,c, player, enemy);
    }
    if (northEastDirection(r,c, player, enemy)) {
        changeFieldsNE(r,c, player, enemy);
    }
    if (eastDirection(r,c, player, enemy)) {
        changeFieldsE(r,c, player, enemy);
    }
    if (westDirection(r,c, player, enemy)) {
        changeFieldsW(r,c, player, enemy);
    }
    if (northWestDirection(r,c, player, enemy)) {
        changeFieldsNW(r,c, player, enemy);
    }
}
function replaceL(r, c, player, enemy) {
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
}
function replaceM(r, c, player, enemy) {
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

function replaceDirections(r, c, player, enemy) {
    var square = checkEdges(r, c);
    switch (square) {
        case 1 :
            replaceUL(r, c, player, enemy);
            break;
        case 2 :
            replaceUR(r, c, player, enemy);
            break;
        case 3 :
            replaceBR(r, c, player, enemy);
            break;
        case 4 :
            replaceBL(r, c, player, enemy);
            break;
        case 5 :
            replaceU(r, c, player, enemy);
            break;
        case 6 :
            replaceR(r, c, player, enemy);
            break;
        case 7 :
            replaceB(r, c, player, enemy);
            break;
        case 8 :
            replaceL(r, c, player, enemy);
            break;
        default:
            replaceM(r, c, player, enemy);
            break;
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

