<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login | Chat App</title>
    <link rel="stylesheet" href="login/css/login.css" />
</head>

<body>
    <?php
    session_start();
    if (!empty($_SESSION["username"])) {
        header("Location: app.php");
        exit;
    }

    $errorCode = $_GET['error'] ?? '';
    $errorMsg = '';
    if ($errorCode) {
        switch ($errorCode) {
            case 'emptyfields':
                $errorMsg = 'Please fill in both username and password.';
                break;
            case 'wrongcredentials':
                $errorMsg = 'Invalid username or password.';
                break;
            case 'loginsuccess':
                $errorMsg = 'Login successful.';
                break;
        }
    }
    ?>
    <div class="login-container">
        <div class="login-card">
            <h2 class="title">Welcome Back</h2>
            <p class="subtitle">Log in to continue chatting</p>

            <form id="loginForm" action="api/login.php" method="post" novalidate>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" required />
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>

                <!-- Error message (server-side) -->
                <div id="errorMsg" class="error-msg" aria-live="polite"
                    style="<?php echo $errorMsg ? 'display:block' : 'display:none' ?>">
                    <?php echo $errorMsg ? htmlspecialchars($errorMsg) : '' ?>
                </div>

                <button type="submit" class="login-btn" name="login">
                    Login
                </button>
            </form>

            <p class="footer-text">
                You dont have an account?
                <a href="signup.php">Signup here</a>
            </p>
        </div>
    </div>
</body>

</html>