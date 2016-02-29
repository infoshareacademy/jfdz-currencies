/**
 * Created by Marcin on 2016-02-18.
 */

var size = 8;
var result = false;
var plansza = [
    ['B', 'e', 'e', 'B', 'e', 'e', 'e', 'e'],
    ['B', 'e', 'e', 'B', 'e', 'e', 'e', 'e'],
    ['B', 'e', 'e', 'B', 'e', 'e', 'e', 'e'],
    ['A', 'B', 'B', 'e', 'B', 'B', 'B', 'B'],
    ['B', 'e', 'e', 'B', 'e', 'e', 'e', 'e'],
    ['B', 'e', 'e', 'B', 'e', 'e', 'e', 'e'],
    ['B', 'e', 'e', 'B', 'e', 'e', 'e', 'e'],
    ['B', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
];

function play(r,c) {
    if (checkAvail(r, c)) {
        if (northDirection(r,c)) {
            result = true;
        } else {
            if (eastDirection(r,c)) {
                result = true;
            } else {
                if (southDirection(r,c)) {
                    result = true;
                } else {
                    westDirection(r,c);
                }
            }
        }
    } else {
        result = false;
    }
    return plansza;
}

function checkAvail(wierszCA, kolumnaCA) {
    if (plansza[wierszCA][kolumnaCA] === 'e') {
        result = true;
    } else {
        result = false;
        //console.log('Nie możesz postawić pionka bo pole nie jest puste');
    }
    return result;
}

function northDirection(wierszCN, kolumnaCN) {
    wierszCN--;
    if (plansza[wierszCN][kolumnaCN] === 'B') {
        result = true;
        wierszCN--;
        checkRopeN(wierszCN, kolumnaCN);
    } else {
        result = false
        console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
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
        console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
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
        console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
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
        console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
    return result;
}

function checkRopeN(wierszCR, kolumnaCR) {
    while (wierszCR > 0 && plansza[wierszCR][kolumnaCR] === 'B') {
        wierszCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeS(wierszCR, kolumnaCR) {
    while (wierszCR < 7 && plansza[wierszCR][kolumnaCR] === 'B') {
        wierszCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeE(wierszCR, kolumnaCR) {
    while (kolumnaCR < 7 && plansza[wierszCR][kolumnaCR] === 'B') {
        kolumnaCR++;
    }
    checkEnd(wierszCR, kolumnaCR);
}
function checkRopeW(wierszCR, kolumnaCR) {
    while (kolumnaCR > 0 && plansza[wierszCR][kolumnaCR] === 'B') {
        kolumnaCR--;
    }
    checkEnd(wierszCR, kolumnaCR);
}

function checkEnd(wierszCE, kolumnaCE) {
    if (plansza[wierszCE][kolumnaCE] === 'A') {
        console.log('Mamy na koncu A i mozemy przewalutowac');
    } else {
        result = false;
        console.log('Mamy na koncu B lub e i nie mozemy postawic pionka');
    }
    return result;
}




//function setupGame(rozmiar) {
//    document.getElementById('game').style.display = 'block';
//    setSpace(rozmiar);
//    addCoins();
//}
//
//function setSpace(rozmiar) {
//
//    for (var i=0; i<rozmiar; i++ ) {
//        for (var j=0; j<rozmiar; j++) {
//            var wiersz=i+1;
//            var kolumna=j+1;
//            if ((i+j)%2==0) {
//                appendMsg('<div class="euro" style="background-color: darkgreen;">A</div>');
//            } else {
//                appendMsg('<div class="dolar" style="background-color: forestgreen;">B</div>');
//            }
//        }
//        appendMsg('<br>');
//    }
//}

//function appendMsg(output) {
//    document.getElementById('game').innerHTML += output;
//}