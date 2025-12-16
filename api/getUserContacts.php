<?php

$file = __DIR__ . '/../fake_database/users.json';
$fileContent = file_get_contents($file);
$userContacts = json_decode($fileContent, true); // decode as array

// Get the username from the request
$data = file_get_contents('php://input');
$currentUser =  json_decode($data, true); // decode as array

$contacts = null;

// Find the current user's contacts
if ($currentUser) {
    foreach ($userContacts['accounts'] as $acc) {
        if ($acc['username'] === $currentUser) {
            $contacts = $acc['contacts'];
            break;
        }
    }
}

// Return contacts or empty array if not found
if ($contacts !== null) {
    echo json_encode($contacts);
} else {
    echo json_encode(["contact" => []]);
}
?>
