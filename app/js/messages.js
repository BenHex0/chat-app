function getMessages(contact, callback) {
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/Chat-App/api/getMessages.php", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log("Messages data:", data);
            callback(data.messages || []);
        } else {
            callback([]);
        }
    };

    xhr.send(JSON.stringify({contact: contact}));
}

function renderMessages(messages, currentUser) {
    const container = document.getElementById("messagesContainer");
    container.innerHTML = "";

    messages.forEach((msg) => {
        const div = document.createElement("div");

        div.classList.add(
            "message",
            msg.from === currentUser.username ? "sent" : "received"
        );

        div.innerHTML = `<div class="bubble">${msg.text}</div>`;
        container.appendChild(div);
    });
}

function fetchMessages(contactUsername, currentUser) {
    getMessages(contactUsername, (messages) => {
        console.log("get messsages");
        renderMessages(messages, currentUser);
    });
}

function renderMessages(messages, currentUser) {
    const container = document.getElementById("messagesContainer");

    if (container) {
        container.innerHTML = "";
    
        messages.forEach((msg) => {
            const div = document.createElement("div");
    
            div.classList.add(
                "message",
                msg.from === currentUser.username ? "sent" : "received"
            );
    
            div.innerHTML = `<div class="bubble">${msg.text}</div>`;
            container.appendChild(div);
        });
    }

}

function sendMessage(input, currentUser, contactUsername, container) {
    const text = input.value.trim();
    if (!text) return;

    console.log(contactUsername);
    saveMessage(currentUser.username, contactUsername, text);

    input.value = "";
}


function saveMessage(from, to, text) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/Chat-App/api/saveMessage.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ from, to, text }));
}