<?php
session_start();
session_destroy(); // Niszczenie sesji
header('Location: index.html'); // Przekierowanie do strony głównej
exit;
