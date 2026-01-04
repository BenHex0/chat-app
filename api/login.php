<?php
header('Content-Type: application/json');

if (isset($_POST["login"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    if (empty($username) || empty($password)) {
        header('Location: /Chat-App/login.php?error=emptyfields');
        exit;
    } else {
        // fake database login
        $usersFile = __DIR__ . '/../fake_database/users.json';

        $usersJson = file_get_contents($usersFile);
        $users = json_decode($usersJson, true);

        if (!$users || !isset($users['accounts'])) {
            echo json_encode(["status" => false, "message" => "No users found"]);
            exit;
        }

        // gonna replace this with a database later
        /////////////////////////////////////////////////////////////
        foreach ($users['accounts'] as $i => $acc) {
            if (!isset($acc['username']))
                continue;
            if ($acc['username'] !== $username)
                continue;

            $stored = $acc['password'] ?? '';

            // If stored is a bcrypt/hash, use password_verify; otherwise compare plaintext
            $ok = false;
            if ($stored !== '' && password_verify($password, $stored)) {
                $ok = true;
            } elseif ($stored === $password) {
                $ok = true;
            }

            if ($ok) {
                // set session for future server-side checks
                if (session_status() === PHP_SESSION_NONE)
                    session_start();
                // store user id when you use database
                $_SESSION['username'] = $username;
                header('Location: /Chat-App/app.php');
                exit;
            }
        }
        /////////////////////////////////////////////////////////////

        header('Location: /Chat-App/login.php?error=wrongcredentials');
        exit;

    }
}
