<?php
require_once 'database.php';
session_start();

// Get current user ID from session
$currentUserId = $_SESSION['user_id'] ?? null;
$input = json_decode(file_get_contents('php://input'), true);

// Access contact safely
$contactUsername = $input['contact'] ?? null;

if (!$contactUsername) {
    echo json_encode(["error" => "No contact specified"]);
    exit;
}

//Get the contact's user ID
$contactUsernameID = getUserID($contactUsername);


// Find the chat involving both users
$sql = "SELECT c.id AS chat_id
        FROM chats AS c
        JOIN chat_users AS cu1 ON c.id = cu1.chat_id AND cu1.user_id = '{$currentUserId}'
        JOIN chat_users AS cu2 ON c.id = cu2.chat_id AND cu2.user_id = '{$contactUsernameID}'
        LIMIT 1";

$contactUsernameID = runQuery($sql);

if (!$contactUsernameID || mysqli_num_rows($contactUsernameID) === 0) {
    // No chat exists yet
    echo json_encode(["messages" => []]);
    exit;
}

$chatId = mysqli_fetch_assoc($contactUsernameID)['chat_id'];


// Fetch all messages for this chat
$sql = "SELECT m.id, u.username AS sender, m.content, m.created_at
        FROM messages AS m
        JOIN users AS u ON m.sender_id = u.id
        WHERE m.chat_id = '{$chatId}'
        ORDER BY m.created_at ASC";

$contactUsernameID = runQuery($sql);

$messages = [];
if ($contactUsernameID) {
    while ($row = mysqli_fetch_assoc($contactUsernameID)) {
        $messages[] = [
            "from" => $row['sender'],
            "text" => $row['content'],
            "created_at" => $row['created_at']
        ];
    }
}

closeConnection();
echo json_encode(["messages" => $messages]);
exit;
