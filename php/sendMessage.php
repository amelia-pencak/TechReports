<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $servername = "localhost";
    $username = "root";
    $dbpassword = "";
    $dbname = "techreports";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $id_user = $conn->real_escape_string($_POST['id_user']);
    $title = $conn->real_escape_string($_POST['title']);
    $contents = $conn->real_escape_string($_POST['contents']);

    $file_name = NULL;
    $file_content = NULL;

    if (isset($_FILES['files']) && $_FILES['files']['error'] == 0) {
        $file_name = $_FILES['files']['name']; // Pobierz nazwę pliku
        $temp_name = $_FILES['files']['tmp_name'];
        $file_content = file_get_contents($temp_name); // Odczytaj zawartość pliku
    }

    $stmt = $conn->prepare("INSERT INTO messages (id_user, title, contents, file_name, files, sent_at) VALUES (?, ?, ?, ?, ?, NOW())");
    $null = NULL;
    $stmt->bind_param("ssssb", $id_user, $title, $contents, $file_name, $null);
    if ($file_content !== NULL) {
        $stmt->send_long_data(4, $file_content); // Wysyłanie danych BLOB
    }

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>


