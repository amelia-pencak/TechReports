function initializeSlider() {
     var inWrap = $('.inner_wrapper');
          // $slide = $('.slide');

     function slideNext() {
          inWrap.animate({ left: '-200%' }, 200, function () {
               inWrap.css('left', '-100%');
               $('.slide').last().after($('.slide').first());
          });
     }
     sliderInterval = setInterval(slideNext, 4000);

     $('.prev').on('click', function () {
          inWrap.animate({ left: '0%' }, 200, function () {
               inWrap.css('left', '-100%');
               $('.slide').first().before($('.slide').last());
          });
     });

     $('.next').on('click', function () {
          slideNext();
     });



}
