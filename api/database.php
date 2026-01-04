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
    closeConnection();
    return $result;
}