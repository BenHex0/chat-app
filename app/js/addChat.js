// DOM elements
const modal = document.getElementById("contactModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const addBtn = document.getElementById("addContact");
const chatContainer = document.getElementById("chatContainer");
const input = document.getElementById("contactName");
const recommendationsList = document.getElementById("recommendations");
const modalError = document.getElementById("modal-error");

// Open/close modal
openBtn.onclick = () => (modal.style.display = "flex");
closeBtn.onclick = () => {
    modal.style.display = "none";
    input.value = "";
    recommendationsList.innerHTML = "";
    recommendationsList.style.display = "none";
    modalError.innerText = "";
};

// Fetch recommendations as user types
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

// Add chat button
addBtn.onclick = () => {
    const contactName = input.value.trim();
    if (!contactName) return;

    addChat(contactName, function (response) {
        if (response.status === false) {
            modalError.innerText = response.message;
            return;
        } 
        else {
            // Close modal & reset input
            modal.style.display = "none";
            input.value = "";
            recommendationsList.innerHTML = "";
            recommendationsList.style.display = "none";
            renderUserChats();
        }
    });
};

// --- API Calls ---
function addChat(username, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/Chat-App/api/addChat.php", true);

    let response = null;

    xhr.onload = function () {
        if (xhr.status === 200) {
            response = JSON.parse(xhr.responseText);
            console.log(response.message);
            callback(response);
        }
    };

    xhr.send(JSON.stringify({ username: username }));
}


function getUserRecommendations(query, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/Chat-App/api/searchChats.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const res = JSON.parse(xhr.responseText);
                callback(res);
            } catch {
                callback([]);
            }
        } else {
            callback([]);
        }
    };

    xhr.send(JSON.stringify({ query }));
}