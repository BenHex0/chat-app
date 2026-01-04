<?php

session_start();
if (isset($_SESSION["username"])) {
    header("Location: app.php");
    exit;
} else {
    header("Location: login.php");
    exit;
}