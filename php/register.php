<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

     $servername = "localhost";
     $username = "root";
     $dbpassword = "";
     $dbname = "techreports";

     $conn = new mysqli($servername, $username, $dbpassword, $dbname);

     if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
     }

     $firstname = $conn->real_escape_string($_POST['firstname']);
     $lastname = $conn->real_escape_string($_POST['lastname']);
     $email = $conn->real_escape_string($_POST['email']);
     $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
     $phone = $conn->real_escape_string($_POST['phone']);
     

     $sql = "INSERT INTO users (firstname, lastname, email, password, phone)
      VALUES ('$firstname', '$lastname', '$email', '$password',  '$phone')";


     if($conn->query($sql) === TRUE) {
//           echo json_encode(["success" => true]);
//     exit;

          header('Location: http://127.0.0.1:5501/index.html');
        exit;
     } else {
          echo "Error: " . $sql . "<br>" . $conn->error;
     }



     $conn->close();

}
