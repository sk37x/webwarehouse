$(document).ready(function ($) {
    $('body').append('<div class="overlay-sidebar trans-2"></div>')
    var btnSidebar = $('.btn-show-sidebar');
    var btnHideSidebar = $('.btn-hide-sidebar')
    var ovlSidebar = $('.overlay-sidebar');


    var sidebar = $('.sidebar');

    $(btnSidebar).on('click', () => {
        $(sidebar).addClass("show-sidebar");
        $(ovlSidebar).addClass('show-overlay-sidebar');
    });

    $(btnHideSidebar).on('click', () => {
        $(sidebar).removeClass('show-sidebar');
        $(ovlSidebar).removeClass('show-overlay-sidebar');
    })


    $(ovlSidebar).on('click', () => {
        $(sidebar).removeClass('show-sidebar');
        $(ovlSidebar).removeClass('show-overlay-sidebar');
    })




    // TEST
    var selx = $('#selectCate');
    console.log(selx);
    $(selx).on('change', () => {

        console.log($(this).val());
    })

    var showx = $('.showx');
    var spnHideText = $('.hideText');
    $(showx).each(function (i, val) {
        var num = i;
        $(this).hover(function () {
            $(spnHideText).each(function (i, val) {
                if (num === i) {
                    console.log(val)
                    $(this).show('bounce', 300);

                }
            })
        })
        $(this).mouseout(function () {
            $(spnHideText).each(function (i, val) {
                if (num === i) {
                    console.log(val)
                    $(this).hide('fade', 200);

                }
            })
        })
    })

})






$(function () {
    $('#dateCin').datepicker({ dateFormat: 'yy-mm-dd', minDate: 0, maxDate: "+1M +10D" });
    $('#dateCout').datepicker({ dateFormat: 'yy-mm-dd', minDate: 0, maxDate: "+1M +10D" });
    $(':input').inputmask();
    $('#dateCin').inputmask({ 'mask': '9999-99-99' });
    $('#dateCout').inputmask({ 'mask': '9999-99-99' });
    $('#phonemask').inputmask({ 'mask': '999-999-9999' });
    var cin = $('#dateCin');
    $(cin).on('change', function () {
        var newDate = $(this).val();
        var newDatex = new Date(newDate);
        var dateNow = new Date();
        var xdifftime = Math.abs(dateNow - newDatex);
        var ntime = Math.ceil(xdifftime / (1000 * 60 * 60 * 24));


        $('#dateCout').datepicker('option', 'minDate', ntime);
    })
});

$(function () {

    // var imx = $('#img-lstx ul li').children('img');

    // $(imx).click(()=>{
    //     var eximg = $('#expendedImg').attr('src');
    //     var imx = imx.attr('src')
    //     eximg = imx;
    // })



});


function openImg(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text

    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image

}