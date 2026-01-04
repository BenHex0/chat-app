<?php
header('Content-Type: application/json');
require_once 'database.php';

$username = $_POST['username'];
$password = $_POST['password'];

// send back error as GET
if (empty($username) || empty($password)) {
    header("Location: ../signup.php?error=emptyfields");
    exit;
}


// check the username already exists
function usernameExists($username)
{
    $sql = "SELECT COUNT(*) AS user
            FROM users 
            WHERE username = '{$username}'";
    $row = runQuery($sql);
    $result = mysqli_fetch_assoc($row);
    return $result['user'] > 0;
}
// insert new user
function insertUser($username, $password)
{
    $sql = "INSERT INTO users (username, password) 
            VALUES ('{$username}', '{$password}')";
    runQuery($sql);
}


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
