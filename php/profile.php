<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5501');

if (!isset($_GET['token'])) {
    echo json_encode(['error' => 'Nie jesteś zalogowany']);
    exit;
}

$servername = "localhost";
$username = "root";
$dbpassword = "";
$dbname = "techreports";

$conn = new mysqli($servername, $username, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$token = $_GET['token'];
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

$stmt_address = $conn->prepare("SELECT * FROM address WHERE user_id = ?");
$stmt_address->bind_param("s", $token);
$stmt_address->execute();
$result_address = $stmt_address->get_result();

if ($result->num_rows > 0) {
    $userData = $result->fetch_assoc();
    $addressData = $result_address->num_rows > 0 ? $result_address->fetch_assoc() : [];
    echo json_encode(['userData' => $userData, 'addressData' => $addressData]);
} else {
    echo json_encode(['error' => 'Nie znaleziono danych użytkownika']);
}

$conn->close();
?>
