jQuery(document).ready(function($) {

    $('.slider').each(function () {
        var $slider = $(this);
        var autoplay = $slider.data("autoplay");
        var items = $slider.data("items");
        var easing = $slider.data("easing");
        var duration = $slider.data("duration");
        var $single_slide = $slider.find('.single_slide');
        var slider_height = $single_slide.css('height', $slider.data('height')+'px');
        var left_offset = ($(window).width()-1260)/2;

        $slider.css({'width' : $single_slide.length*1260+'px', 'left':- 1260+left_offset + 'px'});

        $single_slide.eq(1).addClass('active');

        var $prev = $('.active').prev();
        var $next = $('.active').next();

        function moveLeft() {
            var $a = $('.active');
            $a.removeClass('active').prev().addClass('active');
            $slider.animate({
                left: parseInt($slider.css('left'), 10) + $single_slide.outerWidth(true),
                easing: easing,
                step: items,
            }, duration, function () {
                $('.single_slide:first').before($('single_slide:last'));
            });
        }
   
       function moveRight() {
            var $a = $('.active');
            $a.removeClass('active').next().addClass('active');
            $slider.animate({
                left: parseInt($slider.css('left'), 10) - $single_slide.outerWidth(true),
                easing: easing,
                step: items,
            }, duration, function () {
                $('.single_slide:last').after($('single_slide:first'));
            });
        }

        $prev.click(function () {
            moveLeft();
        });

        $next.click(function () {
            moveRight();
        });

        if (autoplay == 1) {
            setInterval(function () {
                moveRight();
            }, duration);
        }

        
    });

});
