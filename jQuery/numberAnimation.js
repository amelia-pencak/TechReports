function numberAnimator() {
     var observer = new IntersectionObserver(function (entries, observer) {
          entries.forEach(entry => {
               if (entry.isIntersecting) {
                    startAnimation();
                    observer.unobserve(entry.target);
               }
          });
     }, { threshold: 0.5 });

     var statsContainer = document.querySelector('.stats_container');
     if (statsContainer) {
          observer.observe(statsContainer);
     }
     function startAnimation() {
          $('.number').each(function () {
               var number = $(this).attr('data-number');
               $(this).animateNumber({
                    number: number,
                    numberStep: function (now, tween) {
                         var target = $(tween.elem);
                         target.text(now.toFixed(0) + '+');
                    }
               }, 1900);
          });
     }


}