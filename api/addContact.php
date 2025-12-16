<?php

header("Content-Type: application/json");

$db_file = __DIR__ . '/../fake_database/users.json';

// 1. Read raw JSON input
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    echo json_encode(["status" => false, "message" => "Invalid JSON"]);
    exit;
}

// 2. Validate action
if (!isset($data["action"]) || $data["action"] !== "add_contact") {
    echo json_encode(["status" => false, "message" => "Invalid request"]);
    exit;
}

$owner   = trim($data["owner"]);
$contact = trim($data["contact"]);

if ($owner === "" || $contact === "") {
    echo json_encode(["status" => false, "message" => "Missing data"]);
    exit;
}

// 3. Load database
$db = json_decode(file_get_contents($db_file), true);
$accounts =& $db["accounts"];

$ownerIndex   = -1;
$contactIndex = -1;

// 4. Find users
foreach ($accounts as $i => $user) {
    if ($user["username"] === $owner) {
        $ownerIndex = $i;
    }
    if ($user["username"] === $contact) {
        $contactIndex = $i;
    }
}

// 5. Check existence
if ($ownerIndex === -1) {
    echo json_encode(["status" => false, "message" => "Owner not found"]);
    exit;
}

if ($contactIndex === -1) {
    echo json_encode(["status" => false, "message" => "Contact not found"]);
    exit;
}

// 6. Ensure contacts array exists
if (!isset($accounts[$ownerIndex]["contacts"]["contact"])) {
    $accounts[$ownerIndex]["contacts"]["contact"] = [];
}

if (!isset($accounts[$contactIndex]["contacts"]["contact"])) {
    $accounts[$contactIndex]["contacts"]["contact"] = [];
}

// 7. Prevent duplicates
if (in_array($contact, $accounts[$ownerIndex]["contacts"]["contact"])) {
    echo json_encode(["status" => false, "message" => "Contact already added"]);
    exit;
}

// 8. Add contact BOTH ways
$accounts[$ownerIndex]["contacts"]["contact"][]   = $contact;
$accounts[$contactIndex]["contacts"]["contact"][] = $owner;

// 9. Save database
file_put_contents($db_file, json_encode($db, JSON_PRETTY_PRINT));

// 10. Respond
echo json_encode([
    "status" => true,
    "message" => "Contact added successfully"
]);
