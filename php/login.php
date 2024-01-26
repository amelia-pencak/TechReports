<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
var_dump(session_id());
var_dump($_SESSION);



$servername = "localhost";
$username = "root";
$dbpassword = "";
$dbname = "techreports";

$conn = new mysqli($servername, $username, $dbpassword, $dbname);

if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
}

$email = $conn->real_escape_string($_POST['email']);
$password = $_POST['password'];

$sql = "SELECT id, password FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $row = $result->fetch_assoc();
     if (password_verify($password, $row['password'])) {
          $_SESSION['user_id'] = $row['id'];  // Ustawienie ID użytkownika w sesji
          echo json_encode(["success" => true, "message" => "Logged in successfully"]);
          // header('Location: http://127.0.0.1:5501/index.html');
          exit;
     } else {
          echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    exit;
     }
} else {
     echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
