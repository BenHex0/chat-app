function run() {
    const chatContainer = document.getElementById("chatContainer");

    chatContainer.addEventListener("click", (e) => {

        const deleteBtn = e.target.closest(".delete-chat-btn");
        if (deleteBtn) {
            const username = deleteBtn.dataset.username;
            console.log("Deleting chat for: " + username);
            deleteChat(username);
            renderUserChats();
            const chatArea = document.getElementById("mainChatArea");
            chatArea.innerHTML = `<div class="empty-state">
                                        <div class="select-chat">Select a Chat</div>
                                    </div>`;
            if (pollingInterval) {
                clearInterval(pollingInterval);
                pollingInterval = null;
            }
            return;
        }

        const chatItem = e.target.closest(".chat-item");
        if (chatItem) {
            const username = chatItem.querySelector(".username").textContent;
            console.log("Opening chat with:", username);
            openChat(username);
        }
    });
}

run();
