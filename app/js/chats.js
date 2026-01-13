function getUserChats(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api/getChats.php", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                callback(data);
            } catch (e) {
                console.error("JSON parse error", e);
                callback([]);
            }
        } else {
            callback([]);
        }
    };

    xhr.onerror = function () {
        callback([]);
    };

    xhr.send();
}

function renderUserChats() {
    getUserChats(function (chats) {
        const chatContainer = document.getElementById("chatContainer");
        chatContainer.innerHTML = "";

        if (chats.length === 0) {
            chatContainer.innerHTML = `<div class="no-chats">No chats yet</div>`;
            return;
        }

        chats.forEach((chat) => {
            const chatItem = document.createElement("div");
            chatItem.classList.add("chat-item");

            let avatarContent = "";
            let style = "";

            // FIX: Use 'chat.image' to match your PHP SQL alias
            if (chat.image) {
                const imageUrl = `${chat.image}`;
                style = `style="background-image: url('${imageUrl}'); background-size: cover; color: transparent;"`;
            } else {
                // Fallback to the first letter if image is null
                avatarContent = chat.username[0].toUpperCase();
            }

            chatItem.innerHTML = `
                <div class="profile-picture" ${style}>${avatarContent}</div>
                <label class="username">${chat.username}</label>
                <button class="delete-chat-btn" data-username="${chat.username}">Delete</button>
            `;

            chatContainer.appendChild(chatItem);
        });
    });
}

function buildChatUI(contactUsername) {
    const chatArea = document.getElementById("mainChatArea");

    chatArea.innerHTML = `
        <div class="chat-header">
            <div class="chat-name">${contactUsername}</div>
        </div>

        <div class="chat-area">
            <div class="messages" id="messagesContainer"></div>
        </div>

        <div class="chat-input">
            <input type="text" id="chatInput" placeholder="Type a message..." />
            <button id="sendBtn">Send</button>
        </div>
    `;
}

let pollingInterval = null;
let currentContact = null;

function initializeChatLogic(currentUser, contactUsername) {
    const messagesContainer = document.getElementById("messagesContainer");
    const input = document.getElementById("chatInput");
    const sendButton = document.getElementById("sendBtn");

    if (messagesContainer) {
        const loadMessages = () => fetchMessages(contactUsername, currentUser);
        loadMessages(); // initial load

        // Clear old interval if switching chats
        if (pollingInterval) clearInterval(pollingInterval);
        pollingInterval = setInterval(loadMessages, 1000);

        // Event listeners
        sendButton.addEventListener("click", () =>
            sendMessage(input, currentUser, contactUsername, messagesContainer)
        );

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                sendMessage(
                    input,
                    currentUser,
                    contactUsername,
                    messagesContainer
                );
            }
        });
    }
}

function openChat(contactUsername) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    currentContact = contactUsername;

    buildChatUI(contactUsername);
    initializeChatLogic(currentUser, contactUsername);
}

renderUserChats();
