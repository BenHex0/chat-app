<?php
session_start();
require_once 'database.php';

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!isset($data['username']) || empty($_SESSION['username'])) {
    echo json_encode(["status" => false, "message" => "Invalid request"]);
    exit;
}

$targetUsername = $data['username'];
$myUsername = $_SESSION['username'];

// 2. Get the IDs for both users
$myID = getUserID($myUsername);
$targetID = getUserID($targetUsername);

if (!$myID || !$targetID) {
    echo json_encode(["status" => false, "message" => "User not found"]);
    exit;
}

// 3. Find the chat_id that these two users share
$sqlFindChat = "SELECT a.chat_id AS chat_id
                FROM chat_users a
                JOIN chat_users b 
                ON a.chat_id = b.chat_id
                WHERE a.user_id = {$myID}
                AND b.user_id = {$targetID};";

$result = runQuery($sqlFindChat);
$row = mysqli_fetch_assoc($result);

if ($row) {
    $chatID = $row['chat_id'];

    $sqlDelete = "DELETE FROM chats
                    WHERE id = {$chatID};";
    
    if (runQuery($sqlDelete)) {
        echo json_encode(["status" => true, "message" => "Chat deleted"]);
    } else {
        echo json_encode(["status" => false, "message" => "Database error"]);
    }
} else {
    echo json_encode(["status" => false, "message" => "Chat not found"]);
}