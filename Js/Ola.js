

$(document).ready(function(){
    $(window).scroll(function(){

        var wysokoscDokumentu= $(document).height();
        var scrollOkna = window.scrollY;
        var offsetElementu= $('#gooo').offset();
        var aktualnaWysokoscDokumentu= document.documentElement.clientHeight;

        console.log('aktualna wysokośc viewportu'+ aktualnaWysokoscDokumentu);
        console.log('wysokosc dokumentu:' + wysokoscDokumentu);
        console.log('scroll dokumentu:'+ scrollOkna);
        console.log('offset elementu:', offsetElementu.top);
        console.log('-------------------');

        var naszeZdjecie= aktualnaWysokoscDokumentu + scrollOkna;
        console.log(naszeZdjecie);

        if(naszeZdjecie>= 410) {


        }


    })
})



















