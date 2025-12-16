const modal = document.getElementById("contactModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const addBtn = document.getElementById("addContact");
const chatContainer = document.getElementById("chatContainer");
const input = document.getElementById("contactName");
const recommendationsList = document.getElementById("recommendations");

const CURRENT_USER = "boy"; // Replace with session user

// Modal open/close
openBtn.onclick = () => (modal.style.display = "flex");
closeBtn.onclick = () => {
    modal.style.display = "none";
    input.value = "";
    recommendationsList.innerHTML = "";
    recommendationsList.style.display = "none";
};

// ✅ Get recommendations as user types
input.addEventListener("input", () => {
    const query = input.value.trim();
    if (!query) {
        recommendationsList.innerHTML = "";
        recommendationsList.style.display = "none";
        return;
    }

    getUserRecommendations(query, (results) => {
        recommendationsList.innerHTML = "";
        if (results.length === 0) {
            recommendationsList.style.display = "none";
            return;
        }

        results.forEach((name) => {
            const div = document.createElement("div");
            div.className = "recommendation";
            div.textContent = name;
            div.onclick = () => {
                input.value = name;
                recommendationsList.innerHTML = "";
                recommendationsList.style.display = "none";
            };
            recommendationsList.appendChild(div);
        });

        recommendationsList.style.display = "block";
    });
});

// ✅ Add contact button
addBtn.onclick = () => {
    const contactName = input.value.trim();
    if (!contactName) return;

    addContact(CURRENT_USER, contactName, function (success) {
        if (success) {
            getUserContacts(function (contacts) {
                console.log("contacts hi: " + contacts);
                const chatContainer = document.getElementById("chatContainer");

                // Clear the container
                chatContainer.innerHTML = "";

                // If no chats available
                if (contacts.length === 0) {
                    chatContainer.innerHTML = `<div class="no-chats">No chats yet</div>`;
                } else {
                    contacts.forEach((contacts) => {
                        const chatItem = document.createElement("div");
                        chatItem.classList.add("chat-item");

                        // Add click listener to the entire item
                        chatItem.onclick = () => openChat(contacts);

                        // Build the inner HTML (Profile Picture and Name Label)
                        chatItem.innerHTML = `
            <div class="profile-picture">${contacts[0]}</div>
            <label class="username">${contacts}</label>
        `;

                        chatContainer.appendChild(chatItem);
                    });
                }
            });
            input.value = "";
            recommendationsList.innerHTML = "";
            recommendationsList.style.display = "none";
            modal.style.display = "none";
        }
    });
};

// ✅ API call to add contact
function addContact(owner, newContact, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Chat-App/api/addContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status !== 200) return callback(false);

        try {
            const res = JSON.parse(xhr.responseText);
            if (res.status) callback(true);
            else {
                alert(res.message);
                callback(false);
            }
        } catch (e) {
            console.error("Invalid JSON:", xhr.responseText);
            callback(false);
        }
    };

    xhr.send(
        JSON.stringify({
            action: "add_contact",
            owner: owner,
            contact: newContact,
        })
    );
}

// ✅ API call to get recommendations
function getUserRecommendations(query, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Chat-App/api/searchContacts.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const res = JSON.parse(xhr.responseText);
                callback(res);
            } catch (e) {
                console.error("JSON parse error:", e);
                callback([]);
            }
        } else {
            callback([]);
        }
    };

    xhr.send(
        JSON.stringify({
            query: query,
            user: CURRENT_USER,
        })
    );
}
