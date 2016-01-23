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



function CheckEmail(Adres)

{

    var TestEmail = /^(.[A-Za-z0-9\-]*\w)+@+([A-Za-z0-9\-]*\w)+(\.[A-Za-z]*\w)+$/;

    var Wynik = Adres.match(TestEmail);


    if (Wynik == null)

    {
        alert("Proszę wpisać poprawny adres e-mail!");

        return false;

    }

    return true;

}



function ValidateFrom(form){
    var next = true;
    //Walidacja imienia i nazwiska
    if(form['name'].value.length <= 0){
        alert('Imię i nazwisko nie mogą być puste!');
        next = false;
    }

    //Walidacja emaila
    if (next)
    {
        var TestEmail = /^(.[A-Za-z0-9\-]*\w)+@+([A-Za-z0-9\-]*\w)+(\.[A-Za-z]*\w)+$/;

        var Wynik = form['email'].value.match(TestEmail);
        if (Wynik == null)

        {
            alert("Proszę wpisać poprawny adres e-mail!");

            next = false;

        }

    }
    //Walidacja numeru telefonu
    if (next) {
         var Testphone = /^\d{3}-?\d{3}-?\d{3}$/;
         var wynik1=form['phone'].value.match(Testphone);
        if (wynik1 == null) {
            alert("Proszę wpisać poprawny numer telefonu!");
            next = false;
        }

    }

    if (next){
        if(form['message'].value.length <= 0){
            alert('Podaj wiadomość!');
            next = false;
        }

    }

   return next;
}
