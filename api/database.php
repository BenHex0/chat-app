<?php

$db_server = "localhost";
$db_username = "root";
$db_password = "admin";
$db_name = "chatApp";

$connection = null;

function startConnection() {
    global $db_server, $db_username, $db_password, $db_name, $connection;
    $connection = mysqli_connect($db_server, $db_username, $db_password, $db_name);
    if (!$connection) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    return $connection;
}

function closeConnection() {
    global $connection;
    mysqli_close($connection);
}

function runQuery($sql) {
    $conn = startConnection();
    $result = mysqli_query($conn, $sql);
    return $result;
}

// get the user id
function getUserID($username)
{
    if (empty($username))
        return null;

    $sql = "SELECT id AS id
            FROM users
            WHERE username = '{$username}'
            LIMIT 1";
    $row = runQuery($sql);
    if (mysqli_num_rows($row) === 0) {
        return null;
    }
    $result = mysqli_fetch_assoc($row);
    return $result["id"];
}