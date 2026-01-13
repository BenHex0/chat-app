<?php
header('Content-Type: application/json');
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$username = $_SESSION['username'] ?? null;
$profilePicture = $_SESSION['image'] ?? null;

echo json_encode(["username" => $username, "image" => $profilePicture]);
exit;