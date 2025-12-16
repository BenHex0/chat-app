<?php
header("Content-Type: application/json");

$DB_FILE = __DIR__ . '/../fake_database/users.json';

$input = json_decode(file_get_contents("php://input"), true);

$keyword = strtolower(trim($input["query"] ?? ""));
$current = $input["user"] ?? "";

if ($keyword === "") {
    echo json_encode([]);
    exit;
}

$db = json_decode(file_get_contents($DB_FILE), true);

$currentContacts = [];

// Find current user contacts
foreach ($db["accounts"] as $acc) {
    if ($acc["username"] === $current && isset($acc["contacts"]["contact"])) {
        $currentContacts = $acc["contacts"]["contact"];
        break;
    }
}

$results = [];

foreach ($db["accounts"] as $acc) {
    $username = $acc["username"];

    if (
        $username !== $current &&
        !in_array($username, $currentContacts) &&
        str_contains(strtolower($username), $keyword)
    ) {
        $results[] = $username;
    }
}

echo json_encode($results);
