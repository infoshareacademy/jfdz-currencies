$(document).ready(function () {
    $(document).on("scroll", onScroll);
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('#menu .NaviField a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top-150 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('#menu .NaviField a').removeClass("active");
                    currLink.addClass("active");
                }
            }
        );


    }
});


$(document).ready(function() {

    /* Every time the window is scrolled ... */
    $(window).scroll( function(){

        /* Check the location of each desired element */
        $('.hideme').each( function(i){

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},500);

            }

        });

    });

});


$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
            $('.naglowekStrony').addClass('small-menu');
        } else {
            $('.scrollToTop').fadeOut();
            $('.naglowekStrony').removeClass('small-menu');
        }
    });
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

});

$(document).ready(function() {
    $('.dodatki').css({marginLeft: -1100});

    /* Every time the window is scrolled ... */
    $(window).scroll( function(){

        /* Check the location of each desired element */
        $('.dodatki').each( function(i){

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'margin-left':'0'},5000);

            }

        });

    });

});


$(function () {
    //sticky menu
    var headHeight = $('header').outerHeight();
    $(window).scroll(function () {
        if ($(window).scrollTop() > headHeight) {
            $('naglowekStrony').addClass('stick2top');
        } else {
            $('naglowekStrony').removeClass('stick2top');
        }
    })
});






