<?php
require_once 'database.php';
session_start();

// Read JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (
    !isset($input['to']) ||
    !isset($input['text'])
) {
    echo json_encode(["status" => false, "message" => "Invalid input"]);
    exit;
}

$currentUserID = $_SESSION['user_id'];
$toUsername = $input['to'];
$text = $input['text'];

// Get contact ID
$contactId = getUserID($toUsername);

// Check if chat already exists
$sql = "SELECT c.id AS chat_id
        FROM chats c
        JOIN chat_users cu1 
        ON c.id = cu1.chat_id AND cu1.user_id = '{$currentUserID}'
        JOIN chat_users cu2 
        ON c.id = cu2.chat_id AND cu2.user_id = '{$contactId}'
        LIMIT 1";

$result = runQuery($sql);

if ($result && mysqli_num_rows($result) > 0) {
    // Chat exists
    $chatId = mysqli_fetch_assoc($result)['chat_id'];
} 

// Insert message
$sql = "INSERT INTO messages (chat_id, sender_id, content)
        VALUES ('{$chatId}', '{$currentUserID}', '{$text}')";

runQuery($sql);

echo json_encode([
    "status" => true,
    "message" => "Message saved"
]);

closeConnection();
