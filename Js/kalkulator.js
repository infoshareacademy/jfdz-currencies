/**
 * Created by Marcin on 2016-02-24.
 */
var button = document.getElementById('przelicz');

button.onclick = function() {
    var zlotowki = document.getElementById('zlotowki').value;
    var kurs = document.getElementById('kurs').value;
    debugger;
    var dolary = zlotowki/kurs;
    document.getElementById('dolary').value = dolary;
}