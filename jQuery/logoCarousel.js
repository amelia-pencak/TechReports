function logoCarousel() {
      
     $(document).ready(function() {
          var $carouselInner = $('#carousel_inner');
          var width;
      
           window.setInterval(rotateSlides, 2000); 

          function rotateSlides() {
            if (!width) {
              width = $carouselInner.find('div:first').outerWidth(true);
            }
      
            $carouselInner.css('transform', 'translateX(-' + width + 'px)');
            setTimeout(function() {
              $carouselInner.append($carouselInner.find('div:first'));
              $carouselInner.css({ 'transition': 'none', 'transform': 'translateX(0)' });
              // $carouselInner[0].offsetHeight; //Reflow
      
              $carouselInner.css('transition', 'transform 1s ease');
            }, 1000); 
          }
        });


}

   
   