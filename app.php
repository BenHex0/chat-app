<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat App Demo</title>
    <link rel="stylesheet" href="app/css/app/styles.css" />
</head>

<body>
    <?php
    session_start();
    if (empty($_SESSION["username"])) {
        header("Location: login.php");
        exit;
    }
    ?>

    <div class="sidebar">
        <div class="sidebar-header">
            <div class="profile-picture" id="settings">U</div>
            <label class="username" id="username">Username</label>
        </div>

        <button class="add-contact-btn" id="openModal">
            + Add Contact
        </button>


        <!-- Add Contact Modal -->
        <div class="modal" id="contactModal">
            <div class="modal-content">
                <h3>Add Chat</h3>
                <div id="modal-error" style="color: red;"></div>
                <input type="text" id="contactName" placeholder="Username" autocomplete="off" />
                <div id="recommendations" class="recommendations"></div>
                <button id="addContact">Add</button>
                <button class="close-btn" id="closeModal">Cancel</button>
            </div>
        </div>

        <!-- Change Profile Picture Modal -->
        <div class="modal" id="profilePicModal">
            <div class="modal-content">
                <h3>Change Profile Picture</h3>

                <div class="profile-preview">
                    <div class="profile-picture large" id="previewPic">U</div>
                </div>

                <input type="file" id="profilePicInput" accept="image/*" hidden />

                <button id="choosePicBtn">Choose Picture</button>
                <button id="savePicBtn">Save</button>
                <button class="close-btn" id="cancelPicBtn">Cancel</button>
            </div>
        </div>


        <div class="chat-list">
            <div class="chats" id="chatContainer"></div>
        </div>
    </div>

    <div class="settings-panel">
        <div class="back-btn">back</div>
        <div class="profile-info">
            <div class="profile-picture large" id="prof-picture">U</div>
            <div class="profile-details">
                <div id="username-settings">Username</div>
                <!-- <div class="profile-status">Online</div> -->
            </div>
        </div>

        <div class="settings-section change-pic" id="change-picture">
            <button class="change-pic-btn">Change Profile Picture</button>
        </div>

        <div class="settings-section danger">
            <button class="logout-btn">Log Out</button>
        </div>
    </div>

    <div class="chat-container" id="mainChatArea">
        <div class="empty-state">
            <div class="select-chat">Select a Chat</div>
        </div>

        <script src="app/js/loadUser.js"></script>
        <script src="app/js/chats.js"></script>
        <script src="app/js/messages.js"></script>
        <script src="app/js/addChat.js"></script>
        <script src="./app/js/main.js"></script>
        <script src="app/js/deleteChat.js"></script>
        <script src="app/js/settings.js"></script>
</body>

</html>