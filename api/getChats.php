<?php

require_once 'database.php';

session_start();
$username = $_SESSION['username'] ?? null;
$user_id = $_SESSION['user_id'] ?? null;

if (!$username) {
    header("Location: ../login.php");
    exit;
}

function getUserChats($user_id)
{
    $sql = "SELECT DISTINCT u.username AS username, u.profile_pic AS image
            FROM chat_users AS cu1
            JOIN chat_users AS cu2 ON cu1.chat_id = cu2.chat_id
            JOIN users AS u ON cu2.user_id = u.id
            WHERE cu1.user_id = '{$user_id}'
            AND cu2.user_id != '{$user_id}'";

    $result = runQuery($sql);

    $chats = [];

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $chats[] = [
                'username' => $row['username'],
                'image' => $row['image']
            ];
        }
    }
    return $chats;
}

echo json_encode(getUserChats($user_id));
closeConnection();