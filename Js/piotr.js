function MenuOnClick(p1) {
    document.getElementById('call-to-action').style.display = 'block';
}


function ValidateFrom(form){
    var next = true;
    if (next)
    {
        var TestEmail = /^(.[A-Za-z0-9\-]*\w)+@+([A-Za-z0-9\-]*\w)+(\.[A-Za-z]*\w)+$/;

        var Wynik = form['email'].value.match(TestEmail);
        if (Wynik == null)

        {
            document.getElementById('femail').setAttribute('style','border-width: 2px; border-color: red');
            document.getElementById('femail').focus();
            next = false;

        } else{
            document.getElementById('femail').setAttribute('style','border-width: 1px; border-color: black');

        }

    }
    //Walidacja numeru telefonu
    if (next) {
         var Testphone = /^\d{3}-?\d{3}-?\d{3}$/;
         var wynik1=form['phone'].value.match(Testphone);
        if (wynik1 == null) {
            document.getElementById('fphone').setAttribute('style','border-width: 2px; border-color: red');
            next = false;
        } else {
            document.getElementById('fphone').setAttribute('style','border-width: 1px; border-color: black');
            document.getElementById('fphone').focus();
        }

    }
    return next;
}




function onmouseoverboot(){
    var x = document.getElementById('submit');
    x.disabled= false;
    x.classList.add('animation-button');


}

function getVar (name, url) {
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&#]*)')).exec(url)) {
        return decodeURIComponent(name[1]);
    }
}



$(function() {

       $("form").submit(function () {
        return (ValidateFrom(this));
       });

});



$(function(event) {

    if ((getVar('mailerResult', location.search))==='sent') {
        alert('mail został wysłany');

    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
        window.location = clean_uri;
    }

    }
});










