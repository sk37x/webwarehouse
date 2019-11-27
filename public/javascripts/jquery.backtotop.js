$(document).ready(function () {
    $("#backtotop").on('click', function (event) {
        event.preventDefault();
        $('body, html').animate({
            scrollTop: $(this.hash).offset().top
        }, 300);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 150) {
            $("#backtotop").addClass("visible");
        } else {
            $("#backtotop").removeClass("visible");
        }
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() > 10) {
            $("div.topnav").addClass("bgnav");
        }else{
            $("div.topnav").removeClass("bgnav");
        }
    })
});