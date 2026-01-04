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
        // header("Location: login.php");
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
                <h3>Add Contact</h3>
                <input type="text" id="contactName" placeholder="Username" autocomplete="off" />
                <div id="recommendations" class="recommendations"></div>
                <button id="addContact">Add</button>
                <button class="close-btn" id="closeModal">Cancel</button>
            </div>
        </div>


        <div class="chat-list">
            <div class="chats" id="chatContainer"></div>
        </div>
    </div>

    <div class="settings-panel">
        <div class="back-btn">back</div>
        <div class="profile-info">
            <div class="profile-picture large">U</div>
            <div class="profile-details">
                <div class="profile-name">Username</div>
                <!-- <div class="profile-status">Online</div> -->
            </div>
        </div>

        <div class="settings-section danger">
            <button class="logout-btn">Log Out</button>
        </div>
    </div>

    <div class="chat-container" id="mainChatArea">
        <div class="empty-state">
            <div class="select-chat">Select a Chat</div>
        </div>
        <!-- <div class="chat-header">
                <div class="chat-info">
                    <div class="chat-name">${name}</div>
                </div>
            </div>

            <div class="chat-area">
                <div class="messages">
                    <div class="message received">
                        <div class="bubble">Hey there!</div>
                    </div>
                    <div class="message sent">
                        <div class="bubble">Hi ${name}! How are you?</div>
                    </div>
                    <div class="message sent">
                        <div class="bubble">Hi ${name}! How are you?</div>
                    </div>
                    <div class="message sent">
                        <div class="bubble">Hi ${name}! How are you?</div>
                    </div>
                    <div class="message received">
                        <div class="bubble">Hey there!</div>
                    </div>
                    <div class="message received">
                        <div class="bubble">Hey there!</div>
                    </div>
                    <div class="message received">
                        <div class="bubble">Hey there!</div>
                    </div>
                </div>
            </div>

            <div class="chat-input">
                <input type="text" placeholder="Type a message..." />
                <button id="sendBtn">Send</button>
            </div>
        </div> -->

        <script src="app/js/getUser.js"></script>
        <script src="app/js/getUserContacts.js"></script>
        <script src="app/js/addContact.js"></script>
        <script src="app/js/getMessages.js"></script>
        <script src="./app/js/main.js"></script>
</body>

</html>