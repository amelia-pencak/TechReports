<?php
session_start();

header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
header('Content-Type: application/json');

$token = isset($_GET['token']) ? $_GET['token'] : null;

if ($token) {
    echo json_encode(["loggedIn" => true]);
} else {
    echo json_encode(["loggedIn" => false]);
}

