/**
 * Created by Marcin on 2016-02-18.
 */

var size = 8;

var plansza = [
    ['e', 'e', 'e', 'e', 'e', 'B', 'A', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'B', 'B', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'B', 'B', 'e'],
    ['e', 'e', 'e', 'A', 'B', 'B', 'B', 'e'],
    ['e', 'e', 'B', 'B', 'A', 'B', 'B', 'e'],
    ['A', 'B', 'B', 'B', 'B', 'B', 'B', 'e'],
    ['e', 'A', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'B', 'e', 'A', 'e', 'e', 'e'],
];

function play(r,c) {
    for (c; c < 7; c++) {
        checkField(r, c);
    }
    return plansza;
}

function checkField(wiersz,kolumna) {
    var result = false;
        checkAvail(wiersz, kolumna);
}

function checkAvail(wiersz, kolumna) {
    if (plansza[wiersz][kolumna] === 'e') {
        sprSasiada(wiersz,kolumna);
    } else {
        console.log('Nie możesz postawić pionka bo pole nie jest puste');
    }
}

function sprSasiada(wiersz, kolumna) {
    if (plansza[wiersz-1][kolumna] === 'B') {
        sprSznur(wiersz, kolumna);
    } else {
        console.log('Nie możesz postawić pionka bo Sasiad = A lub e');
    }
}
function sprSznur(wiersz, kolumna) {
    while (wiersz > 1 && plansza[wiersz-1][kolumna] === 'B') {
        wiersz--;
        //console.log('Możesz postawic pionek a dodatkowo kolejne B w wierszu' + wiersz);
    }
    sprKoniec(wiersz-1, kolumna);
}

function sprKoniec(wiersz, kolumna) {
    if (plansza[wiersz][kolumna] === 'A') {
        console.log('Mamy na koncu A i mozemy przewalutowac');
    } else {
        console.log('Mamy na koncu B lub e i nie mozemy postawic pionka');
    }
}

function changeCoins(wiersz, kolumna) {
    if (plansza[wiersz][kolumna] === 'e') {
        plansza[wiersz][kolumna] = 'A';
        plansza[wiersz+1][kolumna] = 'A';
    }
}

//function checkN(7,4) {
//    while ()
//}
//function addCoins() {
//    for (var i = 3; i < 5; i++) {
//        for (var j = 3; j < 5; j++) {
//            if (i === j) {
//                plansza[i][j] = "A";
//            } else {
//                plansza[i][j] = "B";
//            }
//        }
//    }
//    return plansza;
//}


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
//
//function addCoins() {
//
//}
//
//function appendMsg(output) {
//    document.getElementById('game').innerHTML += output;
//}