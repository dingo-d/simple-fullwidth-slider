jQuery(document).ready(function($) {

	$('.slider').each(function() {

		var slider = $(this);
		var autoplay = slider.data('autoplay');
		var items = slider.data('items');
		var easing = slider.data('easing');
		var duration = slider.data('duration');
		var single_slide = slider.find('.single_slide');
		var slider_height = single_slide.css('height', slider.data('height'));
		var offset = ($(window).width()-1260)/2-1260;

		$.each(single_slide, function(index) {
			if (index == 0) $(this).addClass('img' + single_slide.length);
			else $(this).addClass('img' + index);
		});

		slider.css({'width': single_slide.length*1260, 'left': offset});
		single_slide
		.eq(0).addClass('prev').end()
		.eq(1).addClass('active').end()
		.eq(2).addClass('next');

		function moveLeft() {

			$('.active').removeClass('active').prev().addClass('active');

			slider.animate({
				left: slider.position().left+single_slide.outerWidth(true),
				easing: easing,
				step: items
			}, duration, function() {
				$('.single_slide:last').detach().prependTo(slider);
				slider.css('left', offset);
				newNav();
			});
		}

		function moveRight() {

			$('.active').removeClass('active').next().addClass('active');

			slider.animate({
				left: slider.position().left-single_slide.outerWidth(true),
				easing: easing,
				step: items
			}, duration, function() {
				$('.single_slide:first').detach().appendTo(slider);
				slider.css('left', offset);
				newNav();
			});
		}

		function newNav() {

			$('.prev').removeClass('prev');
			$('.next').removeClass('next');
			$('.single_slide')
			.eq(0).addClass('prev').end()
			.eq(2).addClass('next');
		}

		$(document).on('click', '.prev', function() {
			moveLeft();
		});

		$(document).on('click', '.next', function() {
			moveRight();
		});

		if (autoplay == 1) {
			setInterval(function() {
				moveRight();
			}, duration);
		}

	});

});