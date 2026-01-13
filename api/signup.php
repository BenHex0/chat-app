<?php
require_once 'database.php';

$username = $_POST['username'];
$password = $_POST['password'];


if (empty($username) || empty($password)) {
    header("Location: ../login.php?error=emptyfields");
    exit;
}


// check the username already exists
function usernameExists($username)
{
    $sql = "SELECT COUNT(*) AS user
            FROM users 
            WHERE username = '{$username}'";
    $row = runQuery($sql);
   if (mysqli_num_rows($row) === 0) {
        return false;
    }
    return true;
}
// insert new user
function insertUser($username, $password)
{
    $sql = "INSERT INTO users (username, password) 
            VALUES ('{$username}', '{$password}')";
    runQuery($sql);
}

closeConnection();

if (usernameExists($username)) {
    header("Location: ../signup.php?error=usernameexists");
    exit;
} else {
    insertUser($username, $password);
    session_start();
    $_SESSION['username'] = $username;
    header("Location: ../app.php");
    exit;
}
