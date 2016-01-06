function MenuOnClick(p1) {
    document.getElementById('call-to-action').style.display = 'none';
    document.getElementById('onas').style.display = 'none';
    //document.getElementById('moje_zwierzeta').style.display = 'none';
    //document.getElementById('moja_galeria').style.display = 'none';
    //document.getElementById('moje_podroze').style.display = 'none';
    switch (p1) {
        case 1:
            document.getElementById('call-to-action').style.display = 'block';
            break;
        case 2:
            document.getElementById('onas').style.display = 'block';
            break;
        //case 3:
        //    document.getElementById('moje_zwierzeta').style.display = 'block';
        //    break;
        //case 4:
        //    document.getElementById('moja_galeria').style.display = 'block';
        //    break;
        //case 5:
        //    document.getElementById('moje_podroze').style.display = 'block';
        //    break;

    }
}