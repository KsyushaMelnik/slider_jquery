$.fn.slider = function (options) {

    //Vars
    let params = $.extend({
        dots: true,
        arrow: true,
        speed: 1000,
    }, options);
    
    let slidesCount = $('.slider-container .slides-row .slide').length; 
    let template = '';
    let windowWidth = $(window).width();
    let currentSlide = 0;


    // Controllers
    function initTemplate() {
        template += '<div class="arrow prev">Prev</div>' +
                '<div class="arrow next">Next</div>' +
                '<div class="dots">';
        for (let i = 0; i < slidesCount; i++) {
            template += '<div class="dot" data-slide="' + i + '"></div>';
        }
        template += '</div>';
    
        $('.slider-container').append(template);
    }
    

    function slidesController(x) {
        let distance = x * windowWidth * (-1);
        $('.slides-row').css('transform', 'translateX(' + distance + 'px)');
    
        $('.dot').removeClass('active');
        $('.slider-container .dots .dot[data-slide="' + x + '"]').addClass('active');
    }

    //Init
    initTemplate();
    $('.slides-row').css('width', (windowWidth * slidesCount + 100) + 'px');
    $('.dot:nth-child(1)').addClass('active');
    if(params.dots == false) {
        $('.dots').remove();
    } 

    if(params.arrow == false) {
        $('.arrow').remove();
    } 
    $('.slides-row').css('transition', 'all ' + params.speed + 'ms ease');

    //Actions
    $('.prev').on('click', function () {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slidesCount - 1;
        slidesController(currentSlide);
    });
    
    $('.next').on('click', function () {
        currentSlide++;
        if (currentSlide >= slidesCount) currentSlide = 0;
        slidesController(currentSlide);
    });
    
    $('.dot').on('click', function () {
        currentSlide = $(this).attr('data-slide');
        slidesController(currentSlide);
    });
}




