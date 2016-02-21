$(document).ready(function () {
    $(document).on("scroll", onScroll);
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('#menu .NaviField a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('#menu .NaviField a').removeClass("active");
                    currLink.addClass("active");
                }
            }
        )
    }
});



















