document.addEventListener('DOMContentLoaded', (event) => {
     document.getElementById('button_scroll_to_top').addEventListener('click', function() {
         window.scrollTo({ top: 0, behavior: 'smooth' });
     });
 });
 
 