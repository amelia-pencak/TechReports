<?php
// session_start();
header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
error_log("Starting edit.php"); // Log, że skrypt się rozpoczął
error_log(print_r($_POST, true)); // Log, aby zobaczyć dane przesłane POSTem



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $servername = "localhost";
    $username = "root";
    $dbpassword = "";
    $dbname = "techreports";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $token = isset($_GET['token']) ? $conn->real_escape_string($_GET['token']) : null;
if (!$token) {
    echo json_encode(["success" => false, "error" => "Token is missing or invalid"]);
    exit;
}

    $firstname = isset($_POST['firstname']) ? $conn->real_escape_string($_POST['firstname']) : '';
    $lastname = isset($_POST['lastname']) ? $conn->real_escape_string($_POST['lastname']) : '';
    $email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? $conn->real_escape_string($_POST['phone']) : '';

    $country = isset($_POST['country']) ? $conn->real_escape_string($_POST['country']) : '';
    $city = isset($_POST['city']) ? $conn->real_escape_string($_POST['city']) : '';
    $street = isset($_POST['street']) ? $conn->real_escape_string($_POST['street']) : '';
    $streetnumber = isset($_POST['streetnumber']) ? $conn->real_escape_string($_POST['streetnumber']) : '';
    $postalcode = isset($_POST['postalcode']) ? $conn->real_escape_string($_POST['postalcode']) : '';

  

    $sql_users = "UPDATE users SET firstname = ?, lastname = ?, email = ?, phone = ? WHERE id = ?";
    $stmt_users = $conn->prepare($sql_users);
    $stmt_users->bind_param("ssssi", $firstname, $lastname, $email, $phone, $token);

    $sql_address = "INSERT INTO address (user_id, country, city, street, streetnumber, postalcode) VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE country = VALUES(country), city = VALUES(city), street = VALUES(street), streetnumber = VALUES(streetnumber), postalcode = VALUES(postalcode)";
    $stmt_address = $conn->prepare($sql_address);
    $stmt_address->bind_param("isssss", $token, $country, $city, $street, $streetnumber, $postalcode);

    $success = true;
    if (!$stmt_users->execute()) {
        $success = false;
        $error = $stmt_users->error;
        error_log("SQL Query 1 Error: " . $error);

    }

    if (!$stmt_address->execute()) {
        $success = false;
        $error = $stmt_address->error;
        error_log("SQL Query 2 Error: " . $error);
    }


    if ($success) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $error]);
        
    }

    $stmt_users->close();
    $stmt_address->close();
    $conn->close();

}
?>