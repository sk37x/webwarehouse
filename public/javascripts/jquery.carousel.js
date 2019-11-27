$(document).ready(function($) {

    var imageBox = $('.slider ul'),
        imageWidth = $('.slider ul li').first().children('img').width(),
        imageQuantity = $('.slider ul').children('li').length,

        currentImage = 1;

    imageBox.css('width', imageWidth * imageQuantity);
    // console.log(imageQuantity);





    $('.slider a').on('click', function () {
        var whichButton = $(this).data('nav');

        if (whichButton === 'next') {
            if (currentImage === imageQuantity) {
                currentImage = 1;
                transition(currentImage, imageWidth);
            } else {
                currentImage++;
                transition(currentImage, imageWidth);
            }
        } else if (whichButton === 'prev') {
            if (currentImage === 1) {
                currentImage = imageQuantity;
                transition(currentImage, imageWidth);
            } else {
                currentImage--;
                transition(currentImage, imageWidth);
            }
        }
    });
    // Same Function on if-else
    function transition(currentImage, imageWidthInput) {
        var pxValue = -(currentImage - 1) * imageWidth;
        imageBox.animate({
            'left': pxValue
        })
    };

    // Automatic Slide
    setInterval(function () {
        if (currentImage === imageQuantity) {
            currentImage = 1;
            var pxValue = -(currentImage - 1) * imageWidth;
            imageBox.animate({
                'left': pxValue
            }, 2000);
        } else {
            currentImage++;
            var pxValue = -(currentImage - 1) * imageWidth;
            imageBox.animate({
                'left': pxValue
            }, 1000);
        }
    }, 6000);
});