<?php
header('Content-Type: application/json');

$messagesFile = __DIR__ . '/../fake_database/messages.json';
$postData = json_decode(file_get_contents('php://input'), true);

if (!isset($postData['from']) || !isset($postData['to']) || !isset($postData['text'])) {
    echo json_encode($postData);
    // echo json_encode(["status" => false, "message" => "Invalid input"]);
    exit;
}

// Load existing messages
$messagesData = file_get_contents($messagesFile);
$messages = json_decode($messagesData, true);
if (!$messages || !isset($messages['conversations']))
    $messages = ["conversations" => []];

// Find conversation
$conversation = null;
foreach ($messages['conversations'] as &$c) {
    if (in_array($postData['from'], $c['users']) && in_array($postData['to'], $c['users'])) {
        $conversation = &$c;
        break;
    }
}

// If conversation doesn't exist, create it
if (!$conversation) {
    $conversation = [
        "users" => [$postData['from'], $postData['to']],
        "messages" => []
    ];
    $messages['conversations'][] = $conversation;
}

// Add new message
$conversation['messages'][] = [
    "from" => $postData['from'],
    "text" => $postData['text']
];

// Save back to JSON
file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT));

echo json_encode(["status" => true, "message" => "Message saved"]);
