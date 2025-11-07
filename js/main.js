function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (isMobile()) {
    // Example data: you can change this later to fetch from server
    const chats = [
        { name: "Alice" },
        { name: "Bob" },
        { name: "Charlie" },
        // Try commenting all out to test "No chats"
    ];

    // const chats = [];

    const chatContainer = document.getElementById("chatContainer");

    // Clear the container
    chatContainer.innerHTML = "";

    // If no chats available
    if (chats.length === 0) {
        chatContainer.innerHTML = `<div class="no-chats">No chats yet</div>`;
    } else {
        chats.forEach((chat) => {
            const chatItem = document.createElement("div");
            chatItem.classList.add("chat-item");

            // Add click listener to the entire item
            chatItem.onclick = () => openChat(chat.name);

            // Build the inner HTML (Profile Picture and Name Label)
            chatItem.innerHTML = `
            <div class="profile-picture">${chat.name[0]}</div>
            <label class="username">${chat.name}</label>
        `;

            chatContainer.appendChild(chatItem);
        });
    }

    function openChat(name) {
        const chatArea = document.getElementById("mainChatArea");
        chatArea.innerHTML = `
        <div class="chat-header">
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
    </div>
</div>

<div class="chat-input">
    <input type="text" placeholder="Type a message..." />
    <button id="sendBtn">Send</button>
</div>
    `;

        const sendButton = document.getElementById("sendBtn");
        const input = chatArea.querySelector(".chat-input input");

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                console.log("pressed");
                sendMessage();
            }
        });

        sendButton.addEventListener("click", sendMessage);

        function sendMessage() {
            const messageText = input.value.trim();
            if (messageText === "") return;

            const messagesContainer = chatArea.querySelector(".messages");
            const newMessage = document.createElement("div");
            newMessage.classList.add("message", "sent");
            newMessage.innerHTML = `<div class="bubble">${messageText}</div>`;
            messagesContainer.appendChild(newMessage);

            input.value = "";
        }
    }

    // Go to Settings and Go Back
    //////////////////////////////////////////////////////////////////
    let button = document.getElementById("settings");
    const settings = document.querySelector(".settings-panel");
    let settingsBackButton = document.querySelector(".back-btn");

    let showSettings = function () {
        settings.classList.add("active");
    };

    let backToChatList = function () {
        settings.classList.remove("active");
    };

    button.addEventListener("click", showSettings);
    settingsBackButton.addEventListener("click", backToChatList);
    //////////////////////////////////////////////////////////////////
} else {
    console.log("💻 Desktop browser detected");

    // Example data: you can change this later to fetch from server
    const chats = [
        { name: "Alice" },
        { name: "Bob" },
        { name: "Charlie" },
        // Try commenting all out to test "No chats"
    ];

    // const chats = [];

    const chatContainer = document.getElementById("chatContainer");

    // Clear the container
    chatContainer.innerHTML = "";

    // If no chats available
    if (chats.length === 0) {
        chatContainer.innerHTML = `<div class="no-chats">No chats yet</div>`;
    } else {
        chats.forEach((chat) => {
            const chatItem = document.createElement("div");
            chatItem.classList.add("chat-item");

            // Add click listener to the entire item
            chatItem.onclick = () => openChat(chat.name);

            // Build the inner HTML (Profile Picture and Name Label)
            chatItem.innerHTML = `
            <div class="profile-picture">${chat.name[0]}</div>
            <label class="username">${chat.name}</label>
        `;

            chatContainer.appendChild(chatItem);
        });
    }

    function openChat(name) {
        const chatArea = document.getElementById("mainChatArea");
        chatArea.innerHTML = `
        <div class="chat-header">
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
    </div>
</div>

<div class="chat-input">
    <input type="text" placeholder="Type a message..." />
    <button id="sendBtn">Send</button>
</div>
    `;

        const sendButton = document.getElementById("sendBtn");
        const input = chatArea.querySelector(".chat-input input");

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                console.log("pressed");
                sendMessage();
            }
        });

        sendButton.addEventListener("click", sendMessage);

        function sendMessage() {
            const messageText = input.value.trim();
            if (messageText === "") return;

            const messagesContainer = chatArea.querySelector(".messages");
            const newMessage = document.createElement("div");
            newMessage.classList.add("message", "sent");
            newMessage.innerHTML = `<div class="bubble">${messageText}</div>`;
            messagesContainer.appendChild(newMessage);

            input.value = "";
        }
    }

    // Go to Settings and Go Back
    //////////////////////////////////////////////////////////////////
    let button = document.getElementById("settings");
    const settings = document.querySelector(".settings-panel");
    let settingsBackButton = document.querySelector(".back-btn");

    let showSettings = function () {
        settings.classList.add("active");
    };

    let backToChatList = function () {
        settings.classList.remove("active");
    };

    button.addEventListener("click", showSettings);
    settingsBackButton.addEventListener("click", backToChatList);
    //////////////////////////////////////////////////////////////////
}
