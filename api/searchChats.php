<?php
header("Content-Type: application/json");
require_once 'database.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$keyword = trim($input['query'] ?? "");
$currentUserId = $_SESSION['user_id'];

$like = "%{$keyword}%";

$sql = "SELECT u.username
        FROM users u
        WHERE u.id != '{$currentUserId}'
        AND u.username LIKE '{$like}'
        AND u.id NOT IN (
            SELECT cu2.user_id
            FROM chat_users cu1
            JOIN chat_users cu2 
            ON cu1.chat_id = cu2.chat_id
            WHERE cu1.user_id = '{$currentUserId}'
    )
    LIMIT 6
";

$result = runQuery($sql);

$users = [];
while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row['username'];
}

echo json_encode($users);

closeConnection();