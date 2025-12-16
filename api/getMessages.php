<?php
header('Content-Type: application/json');

// Path to messages.json
$file = __DIR__ . '/../fake_database/messages.json';

if (!file_exists($file)) {
    echo json_encode(["messages" => []]);
    exit;
}

// Load messages file
$fileContent = file_get_contents($file);
$dataJson = json_decode($fileContent, true);

if (!$dataJson || !isset($dataJson['conversations'])) {
    echo json_encode(["messages" => []]);
    exit;
}

// Read request body
$input = json_decode(file_get_contents('php://input'), true);

if (
    !isset($input['currentUser']) ||
    !isset($input['contact'])
) {
    echo json_encode(["messages" => []]);
    exit;
}

$currentUser = $input['currentUser'];
$contact = $input['contact'];

// Find the conversation
foreach ($dataJson['conversations'] as $conversation) {
    if (
        in_array($currentUser, $conversation['users']) &&
        in_array($contact, $conversation['users'])
    ) {
        echo json_encode([
            "messages" => $conversation['messages']
        ]);
        exit;
    }
}

// No conversation found
echo json_encode(["messages" => []]);
