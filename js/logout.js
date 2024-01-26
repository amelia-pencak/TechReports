document.getElementById('logoutButton').addEventListener('click', function() {
     fetch('logout.php')
         .then(() => {
             window.location.href = 'index.html'; // Przekierowanie po wylogowaniu
         });
 });
 