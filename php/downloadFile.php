<?php
session_start();
if (!isset($_GET['message_id'])) {
    exit('Brak ID wiadomości');
}

$servername = "localhost";
$username = "root";
$dbpassword = "";
$dbname = "techreports";

$conn = new mysqli($servername, $username, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$message_id = intval($_GET['message_id']);

$stmt = $conn->prepare("SELECT file_name, files FROM messages WHERE id = ?");
$stmt->bind_param("i", $message_id);
$stmt->execute();
$result = $stmt->get_result();


if ($result->num_rows > 0) {
     $row = $result->fetch_assoc();
     $file_content = base64_decode($row['files']);
     $file_content = $row['files'];
     $file_name = $row['file_name'];
 
     header('Content-Type: application/octet-stream');
     header('Content-Disposition: attachment; filename="' . $file_name . '"');
     echo $file_content;
 
} else {
    echo 'Plik nie został znaleziony';
}

$conn->close();
?>
