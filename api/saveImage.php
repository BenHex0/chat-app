<?php
session_start();
require_once 'database.php';

// 1. Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => false, "message" => "Not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// 2. Check if file is uploaded
if (!isset($_FILES['profile_picture']) || $_FILES['profile_picture']['error'] !== 0) {
    echo json_encode(["status" => false, "message" => "No file uploaded or upload error"]);
    exit;
}

$file = $_FILES['profile_picture'];

// 3. Validate file type (optional but recommended)
$allowedTypes = ['image/jpeg', 'image/png'];
if (!in_array($file['type'], $allowedTypes)) {
    echo json_encode(["status" => false, "message" => "Invalid file type"]);
    exit;
}

// 4. Prepare the uploads folder
$uploadsDir = __DIR__ . '/../uploads/'; // folder relative to this PHP file

// 5. Generate a safe file name
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$newFileName = 'avatar_' . $_SESSION['user_id'] . '_' . time() . '.' . $extension;
$targetPath = $uploadsDir . $newFileName;

$imagePath = "http://localhost/Chat-App/uploads/" . $newFileName;

// 6. Move the uploaded file to the uploads folder
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    
    $sql = "UPDATE users 
        SET profile_pic = '{$imagePath}'
        WHERE id = '{$user_id}';";
    runQuery($sql);

    $_SESSION['image'] = $imagePath;

    echo json_encode([
        "status" => true,
        "url" => $imagePath
    ]);
} else {
    echo json_encode(["status" => false, "message" => "Failed to save file"]);
}





