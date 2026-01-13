<?php
require_once 'database.php';

$username = $_POST['username'];
$password = $_POST['password'];

if (empty($username) || empty($password)) {
    header("Location: ../login.php?error=emptyfields");
    exit;
}

// get the user id
$user_id = getUserID($username);

// check if the username exists
function checkUsername($username)
{
    if (empty($username))
        return false;

    $sql = "SELECT username
            FROM users 
            WHERE username = '{$username}'";
    $result = runQuery($sql);
    $row = mysqli_fetch_assoc($result);
  
    if($row['username'] !== $username) {
        return false;
    }

    return true;
}

// check if the password is correct
function checkPassword($username, $password)
{
    $sql = "SELECT password as pwd
            FROM users 
            WHERE username = '{$username}'";
    $result = runQuery($sql);

    if (mysqli_num_rows($result) === 0) {
        return false;
    }

    $row = mysqli_fetch_assoc(result: $result);

    if ($row['pwd'] === $password) {
        return true;
    }
    return false;
}

closeConnection();

if (checkUsername($username) && checkPassword($username, $password)) {
    session_start();
    $_SESSION['username'] = $username;
    $_SESSION['user_id'] = $user_id;
    header("Location: ../app.php");
    exit;
} else {
    header("Location: ../login.php?error=wrongcredentials");
    exit;
}
