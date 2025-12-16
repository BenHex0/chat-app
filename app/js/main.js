// Set User Information
//////////////////////////////////////////////////////////////////
const username = document.getElementById("username");
const currentUser = getCurrentUser();
username.innerHTML = currentUser.username;

const profileLetter = document.getElementById("settings");
profileLetter.innerHTML = currentUser.username[0];
//////////////////////////////////////////////////////////////////

const CURRENT_USER = getCurrentUser().username;

// Connect to WebSocket server
const socket = new WebSocket("ws://localhost:8080");

// Store open chat messages container
let currentMessagesContainer = null;
let currentContact = null;

// Connection opened
socket.addEventListener("open", () => {
    console.log("Connected to WebSocket server as", CURRENT_USER);
});

// Handle incoming messages
socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);

    // Only display if this message belongs to the current chat
    if (
        (msg.from === currentContact && msg.to === CURRENT_USER) ||
        (msg.from === CURRENT_USER && msg.to === currentContact)
    ) {
        appendMessageToUI(msg);
    }
});


function openChat(contactUsername) {
    currentContact = contactUsername;

    buildChatUI(contactUsername);
    initializeChatLogic(contactUsername);
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
    currentMessagesContainer = document.getElementById("messagesContainer");
}

function initializeChatLogic(contactUsername) {
    const input = document.getElementById("chatInput");
    const sendButton = document.getElementById("sendBtn");

    // Load previous messages from server
    fetchMessages(contactUsername);

    // Event listeners for sending messages
    sendButton.addEventListener("click", () =>
        sendMessage(input.value, contactUsername)
    );
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage(input.value, contactUsername);
    });
}


function fetchMessages(contactUsername) {
    getMessages(contactUsername, (messages) => {
        messages.forEach(appendMessageToUI);
        scrollToBottom();
    });
}

function sendMessage(text, contactUsername) {
    text = text.trim();
    if (!text || !currentMessagesContainer) return;

    const msg = {
        from: CURRENT_USER,
        to: contactUsername,
        text: text
    };

    // Append locally (optimistic UI)
    // appendMessageToUI(msg);

    // Send to server
    socket.send(JSON.stringify(msg));

    // Optional: save to backend DB
    saveMessageToServer(msg);

    // Clear input
    document.getElementById("chatInput").value = "";
}

function appendMessageToUI(msg) {
    if (!currentMessagesContainer) return;

    const div = document.createElement("div");
    div.classList.add(
        "message",
        msg.from === CURRENT_USER ? "sent" : "received"
    );
    div.innerHTML = `<div class="bubble">${msg.text}</div>`;
    currentMessagesContainer.appendChild(div);
    scrollToBottom();
}

function scrollToBottom() {
    if (currentMessagesContainer) {
        currentMessagesContainer.scrollTop =
            currentMessagesContainer.scrollHeight;
    }
}

function saveMessageToServer(msg) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Chat-App/api/saveMessage.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(msg));
}






















// // Load User Contacts
// //////////////////////////////////////////////////////////////////
// getUserContacts(function (contacts) {
//     console.log("contacts hi: " + contacts);
//     const chatContainer = document.getElementById("chatContainer");

//     // Clear the container
//     chatContainer.innerHTML = "";

//     // If no chats available
//     if (contacts.length === 0) {
//         chatContainer.innerHTML = `<div class="no-chats">No chats yet</div>`;
//     } else {
//         contacts.forEach((contacts) => {
//             const chatItem = document.createElement("div");
//             chatItem.classList.add("chat-item");

//             // Add click listener to the entire item
//             chatItem.onclick = () => openChat(contacts);

//             // Build the inner HTML (Profile Picture and Name Label)
//             chatItem.innerHTML = `
//             <div class="profile-picture">${contacts[0]}</div>
//             <label class="username">${contacts}</label>
//         `;

//             chatContainer.appendChild(chatItem);
//         });
//     }
// });

// // Go to Settings and Go Back
// //////////////////////////////////////////////////////////////////
// let button = document.getElementById("settings");
// const settings = document.querySelector(".settings-panel");
// let settingsBackButton = document.querySelector(".back-btn");

// let showSettings = function () {
//     settings.classList.add("active");
// };

// let backToChatList = function () {
//     settings.classList.remove("active");
// };

// button.addEventListener("click", showSettings);
// settingsBackButton.addEventListener("click", backToChatList);
// //////////////////////////////////////////////////////////////////

// // Chat
// //////////////////////////////////////////////////////////////////
// let pollingInterval = null;
// let currentContact = null;

// // ------------------------
// // MAIN ENTRY POINT
// // ------------------------
// function openChat(contactUsername) {
//     const currentUser = getCurrentUser();
//     if (!currentUser) return;

//     currentContact = contactUsername;

//     buildChatUI(contactUsername);
//     initializeChatLogic(currentUser, contactUsername);
// }

// function buildChatUI(contactUsername) {
//     const chatArea = document.getElementById("mainChatArea");

//     chatArea.innerHTML = `
//         <div class="chat-header">
//             <div class="chat-name">${contactUsername}</div>
//         </div>

//         <div class="chat-area">
//             <div class="messages" id="messagesContainer"></div>
//         </div>

//         <div class="chat-input">
//             <input type="text" id="chatInput" placeholder="Type a message..." />
//             <button id="sendBtn">Send</button>
//         </div>
//     `;
// }

// function initializeChatLogic(currentUser, contactUsername) {
//     const messagesContainer = document.getElementById("messagesContainer");
//     const input = document.getElementById("chatInput");
//     const sendButton = document.getElementById("sendBtn");

//     const loadMessages = () => fetchMessages(contactUsername, currentUser);
//     loadMessages(); // initial load

//     // Clear old interval if switching chats
//     if (pollingInterval) clearInterval(pollingInterval);
//     pollingInterval = setInterval(loadMessages, 1000);

//     // Event listeners
//     sendButton.addEventListener("click", () =>
//         sendMessage(input, currentUser, contactUsername, messagesContainer)
//     );

//     input.addEventListener("keydown", (e) => {
//         if (e.key === "Enter") {
//             sendMessage(input, currentUser, contactUsername, messagesContainer);
//         }
//     });
// }

// function fetchMessages(contactUsername, currentUser) {
//     getMessages(contactUsername, (messages) => {
//         console.log("get messsages");
//         renderMessages(messages, currentUser);
//     });
// }

// function renderMessages(messages, currentUser) {
//     const container = document.getElementById("messagesContainer");
//     container.innerHTML = "";

//     messages.forEach((msg) => {
//         const div = document.createElement("div");

//         div.classList.add(
//             "message",
//             msg.from === currentUser.username ? "sent" : "received"
//         );

//         div.innerHTML = `<div class="bubble">${msg.text}</div>`;
//         container.appendChild(div);
//     });
// }

// function sendMessage(input, currentUser, contactUsername, container) {
//     const text = input.value.trim();
//     if (!text) return;

//     console.log(contactUsername);
//     saveMessageToServer(currentUser.username, contactUsername, text);

//     input.value = "";
//     container.scrollTop = container.scrollHeight + 100;
// }

// function appendLocalMessage(container, text) {
//     const newMsg = document.createElement("div");
//     newMsg.classList.add("message", "sent");
//     newMsg.innerHTML = `<div class="bubble">${text}</div>`;
//     container.appendChild(newMsg);
//     container.scrollTop = container.scrollHeight + 20;
// }

// function saveMessageToServer(from, to, text) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost/Chat-App/api/saveMessage.php", true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(JSON.stringify({ from, to, text }));
// }
// //////////////////////////////////////////////////////////////////
