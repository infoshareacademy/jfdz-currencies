/**
 * Created by Marcin on 2016-02-18.
 */

var size = 8;
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
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        wierszCN--;
        checkRopeN(wierszCN, kolumnaCN);
    } else {
        result = false
        //console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}
function northEastDirection(wierszCN, kolumnaCN) {
    wierszCN--;
    kolumnaCN++;
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        wierszCN--;
        kolumnaCN++;
        checkRopeNE(wierszCN, kolumnaCN);
    } else {
        result = false
        //console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}
function eastDirection(wierszCN, kolumnaCN) {
    kolumnaCN++;
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        kolumnaCN++;
        checkRopeE(wierszCN, kolumnaCN);
    } else {
        result = false;
        //console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}
function southEastDirection(wierszCN, kolumnaCN) {
    wierszCN++;
    kolumnaCN++;
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        wierszCN++;
        kolumnaCN++;
        checkRopeSE(wierszCN, kolumnaCN);
    } else {
        result = false;
        //console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}
function southDirection(wierszCN, kolumnaCN) {
    wierszCN++;
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        wierszCN++;
        checkRopeS(wierszCN, kolumnaCN);
    } else {
        result = false;
        //console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}
function southWestDirection(wierszCN, kolumnaCN) {
    wierszCN++;
    kolumnaCN--;
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        wierszCN++;
        kolumnaCN--;
        checkRopeSW(wierszCN, kolumnaCN);
    } else {
        result = false;
        //console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}
function westDirection(wierszCN, kolumnaCN) {
    kolumnaCN--;
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        kolumnaCN--;
        checkRopeW(wierszCN, kolumnaCN);
    } else {
        result = false;
        //console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}
function northWestDirection(wierszCN, kolumnaCN) {
    wierszCN--;
    kolumnaCN--;
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        wierszCN--;
        kolumnaCN--;
        checkRopeNW(wierszCN, kolumnaCN);
    } else {
        result = false;
        //console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}

function checkRopeN(wierszCR, kolumnaCR) {
    while (wierszCR > 0 && plansza[wierszCR][kolumnaCR] === 'B') {
        wierszCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeNE(wierszCR, kolumnaCR) {
    while (wierszCR > 0 && kolumnaCR < 7 && plansza[wierszCR][kolumnaCR] === 'B') {
        wierszCR--;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeE(wierszCR, kolumnaCR) {
    while (kolumnaCR < 7 && plansza[wierszCR][kolumnaCR] === 'B') {
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeSE(wierszCR, kolumnaCR) {
    while ((wierszCR < 7 || kolumnaCR < 7 )&& plansza[wierszCR][kolumnaCR] === 'B') {
        wierszCR++;
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeS(wierszCR, kolumnaCR) {
    while (wierszCR < 7 && plansza[wierszCR][kolumnaCR] === 'B') {
        wierszCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeSW(wierszCR, kolumnaCR) {
    while (kolumnaCR > 0 && wierszCR < 7 && plansza[wierszCR][kolumnaCR] === 'B') {
        wierszCR++;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeW(wierszCR, kolumnaCR) {
    while (kolumnaCR > 0 && plansza[wierszCR][kolumnaCR] === 'B') {
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeNW(wierszCR, kolumnaCR) {
    while ((kolumnaCR > 0 || wierszCR > 0 ) && plansza[wierszCR][kolumnaCR] === 'B') {
        wierszCR--;
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}

function checkEnd(wierszCE, kolumnaCE) {
    if (plansza[wierszCE][kolumnaCE] === 'A') {
        result = true;
        //console.log('Mamy na koncu A i mozemy przewalutowac');
    } else {
        result = false;
        //console.log('Mamy na koncu B lub e i nie mozemy postawic pionka');
    }
    return result;
}

function replaceMarks(wiersz, kolumna) {
    replaceDirections(wiersz,kolumna);
    plansza[wiersz][kolumna] = 'A';
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
    while (plansza[row][column] === 'B') {
        plansza[row][column] = 'A';
        row--;
    }
}
function changeFieldsNE(row,column) {
    row--;
    column++;
    while (plansza[row][column] === 'B') {
        plansza[row][column] = 'A';
        row--;
        column++;
    }
}
function changeFieldsE(row,column) {
    column++;
    while (plansza[row][column] === 'B') {
        plansza[row][column] = 'A';
        column++;
    }
}
function changeFieldsSE(row,column) {
    row++;
    column++;
    while (plansza[row][column] === 'B') {
        plansza[row][column] = 'A';
        row++;
        column++;
    }
}
function changeFieldsS(row,column) {
    row++;
    while (plansza[row][column] === 'B') {
        plansza[row][column] = 'A';
        row++;
    }
}
function changeFieldsSW(row,column) {
    row++;
    column--;
    while (plansza[row][column] === 'B') {
        plansza[row][column] = 'A';
        row++;
        column--;
    }
}
function changeFieldsW(row,column) {
    column--;
    while (plansza[row][column] === 'B') {
        plansza[row][column] = 'A';
        column--;
    }
}
function changeFieldsNW(row,column) {
    row--;
    column--;
    while (plansza[row][column] === 'B') {
        plansza[row][column] = 'A';
        row--;
        column--;
    }
}

