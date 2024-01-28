<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


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

$token1 = $_GET['token'];
$token = (int)$token1;
$stmt = $conn->prepare("SELECT m.title, m.contents, m.files, m.sent_at, u.firstname, u.lastname FROM messages m INNER JOIN users u ON m.id_user = u.id WHERE u.id = ?");
error_log($conn->error);
$stmt->bind_param("i", $token);
$stmt->execute();
$result = $stmt->get_result();

$messages = [];
if ($result->num_rows > 0) {
    $messages = $result->fetch_all(MYSQLI_ASSOC); // Zbieranie wszystkich wierszy w tablicy asocjacyjnej
    for ($i = 0; $i < count($messages); $i++) {

        $messages[$i]['files'] = json_decode($messages[$i]['files']);
    }
    echo json_encode($messages); 
} else {
    echo json_encode(['error' => 'Nie znaleziono wiadomości']);
}

$conn->close();
