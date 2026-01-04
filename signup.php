<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign Up | Chat App</title>
    <link rel="stylesheet" href="signup/css/signup.css" />
</head>

<body>
    <?php
    session_start();
    // if (isset($_SESSION["username"])) {
    //     header("Location: app.php");
    //     exit;
    // }

    $errorCode = $_GET['error'] ?? '';
    $errorMsg = '';
    if ($errorCode) {
        switch ($errorCode) {
            case "usernameexists":
                $errorMsg = "username is already taken.";
                break;
            case "emptyfields":
                $errorMsg = "Please fill in both username and password.";
                break;
        }
    }
    ?>

    <div class="login-container">
        <div class="login-card">
            <h2 class="title">Join the Chat 👋</h2>
            <p class="subtitle">Create your account to start chatting</p>

            <form id="signupForm" novalidate action="api/signup.php" method="post">
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Choose a username" required />
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Choose a password" required />
                </div>

                <!-- Error message (server-side) -->
                <div id="errorMsg" class="error-msg" aria-live="polite"
                    style="<?php echo $errorMsg ? 'display:block' : 'display:none' ?>">
                    <?php echo $errorMsg ? htmlspecialchars($errorMsg) : '' ?>
                </div>

                <button type="submit" class="login-btn">Sign Up</button>
            </form>

            <p class="footer-text">
                Already have an account? <a href="../login.php">Login here</a>
            </p>
        </div>
    </div>
</body>

</html>