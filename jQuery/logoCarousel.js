function logoCarousel() {
      
     $(document).ready(function() {
          var $carouselInner = $('#carousel_inner');
          var interval, width;
      
          function startRotation() {
            interval = window.setInterval(rotateSlides, 2000); 
          }

          function rotateSlides() {
            if (!width) {
              width = $carouselInner.find('div:first').outerWidth(true);
            }
      
            $carouselInner.css('transform', 'translateX(-' + width + 'px)');
            setTimeout(function() {
              $carouselInner.append($carouselInner.find('div:first'));
              $carouselInner.css({ 'transition': 'none', 'transform': 'translateX(0)' });
              $carouselInner[0].offsetHeight;
      
              $carouselInner.css('transition', 'transform 1s ease');
            }, 1000); 
          }
          $carouselInner.css('transition', 'transform 1s ease');
          startRotation();
        });


}

   
   