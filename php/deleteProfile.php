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

$token = $conn->real_escape_string($_GET['token']);

// Usuwanie powiązanych rekordów
$deleteMessages = "DELETE FROM messages WHERE id_user = ?";
$stmtMessages = $conn->prepare($deleteMessages);
$stmtMessages->bind_param("s", $token);
$stmtMessages->execute();

$deleteAddress = "DELETE FROM address WHERE user_id = ?";
$stmtAddress = $conn->prepare($deleteAddress);
$stmtAddress->bind_param("s", $token);
$stmtAddress->execute();

// Usuwanie profilu użytkownika
$deleteUser = "DELETE FROM users WHERE id = ?";
$stmtUser = $conn->prepare($deleteUser);
$stmtUser->bind_param("s", $token);
$stmtUser->execute();

if ($stmtUser->affected_rows > 0) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Nie udało się usunąć profilu"]);
}

$conn->close();
?>
