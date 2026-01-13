<?php
session_start();
require_once 'database.php';

// 1. Read raw JSON input
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
$user_id = $_SESSION['user_id'] ?? null;

$data['username'] = trim($data['username'] ?? '');

if (!isset($data['username']) || empty($data['username'])) {
    echo json_encode(["status" => false, "message" => "Empty Username"]);
    exit;
}

$usernameToAdd = $data['username'];

// 2. check if user exists
$sql = "SELECT id 
        FROM users 
        WHERE username = '{$usernameToAdd}' 
        LIMIT 1";

$result = runQuery($sql);
if (!$result || mysqli_num_rows($result) === 0) {
    echo json_encode(["status" => false, "message" => "User does not exist"]);
    exit;
}
$row = mysqli_fetch_assoc($result);
$usernameID = $row['id'];


// 3. check if chat already exists
$sql = "SELECT EXISTS (
                SELECT 1
                FROM chat_users cu1
                JOIN chat_users cu2 
                ON cu1.chat_id = cu2.chat_id
                WHERE cu1.user_id = '{$user_id}'
                AND cu2.user_id = '{$usernameID}'
        ) AS is_friend;";

$result = runQuery($sql);
$row = mysqli_fetch_assoc($result);
if ($row['is_friend']) {
    echo json_encode(["status" => false, "message" => "Chat already exists"]);
    exit;
}


// 1. Run the insert
runQuery("INSERT INTO chats () VALUES ()");

// 2. Access the global $connection to get the ID
global $connection; 
$newChatID = mysqli_insert_id($connection);


if ($newChatID) {
    // 3. Use it for the next inserts
    runQuery("INSERT INTO chat_users (chat_id, user_id) VALUES ($newChatID, $user_id)");
    runQuery("INSERT INTO chat_users (chat_id, user_id) VALUES ($newChatID, $usernameID)");
    echo json_encode(["status" => true, "message" => "Chat created Successfully."]);
} else {
    echo json_encode(["status" => false, "message" => "Failed to get ID."]);
}

closeConnection();
exit;