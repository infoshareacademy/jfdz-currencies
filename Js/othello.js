/**
 * Created by Marcin on 2016-02-18.
 */

function setupGame(rozmiar) {
    document.getElementById('game').style.display = 'block';
    setSpace(rozmiar);
    addCoins();
}

function setSpace(rozmiar) {

    for (var i=0; i<rozmiar; i++ ) {
        for (var j=0; j<rozmiar; j++) {
            var wiersz=i+1;
            var kolumna=j+1;
            if ((i+j)%2==0) {
                appendMsg('<div class="euro" style="background-color: darkgreen;">A</div>');
            } else {
                appendMsg('<div class="dolar" style="background-color: forestgreen;">B</div>');
            }
        }
        appendMsg('<br>');
    }
}

function addCoins() {

}

function appendMsg(output) {
    document.getElementById('game').innerHTML += output;
}