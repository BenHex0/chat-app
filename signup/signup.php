<?php
header('Content-Type: application/json');

$usersFile = __DIR__ . '/../fake_database/users.json';
$postData = json_decode(file_get_contents('php://input'), true);

if (!isset($postData['username']) || !isset($postData['password'])) {
    echo json_encode(["status" => false, "message" => "Invalid input"]);
    exit;
}

$username = trim($postData['username']);
$password = trim($postData['password']); // plain text for now, can hash later

// Load existing users
$usersData = file_get_contents($usersFile);
$users = json_decode($usersData, true);

if (!$users || !isset($users['accounts'])) {
    $users = ["accounts" => []];
}

// Check if username exists
foreach ($users['accounts'] as $acc) {
    if ($acc['username'] === $username) {
        echo json_encode(["status" => false, "message" => "Username already taken"]);
        exit;
    }
}

// Add new user
$users['accounts'][] = [
    "username" => $username,
    "password" => $password
];

// Save back to JSON file
file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

echo json_encode(["status" => true, "message" => "User created successfully"]);
