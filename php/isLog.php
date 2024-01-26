<?php
session_start();
var_dump(session_id());
var_dump($_SESSION);

header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
header('Content-Type: application/json');


if (isset($_SESSION['user_id'])) {
    // Użytkownik jest zalogowany
    $key = $_SESSION['user_id'];
    echo json_encode(["loggedIn" => true]);
} else {
    // Użytkownik nie jest zalogowany
    echo json_encode(["loggedIn" => false]);
}
