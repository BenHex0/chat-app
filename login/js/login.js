// =========================
// Fetch accounts using XHR
// =========================
function getAccounts(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/Chat-App/fake_database/users.json", true);

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data.accounts);
        } else {
            console.error("Failed to load data.json");
            callback([]); // fallback: empty list
        }
    };

    xhr.onerror = function () {
        console.error("Network error while loading JSON");
        callback([]);
    };

    xhr.send();
}

// =========================
// Error message helpers
// =========================
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

function showError(text) {
    errorMsg.textContent = text;
    errorMsg.style.display = "block";
}

function clearError() {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
}

// =========================
// Handle login submit
// =========================
form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        showError("Please enter both username and password.");
        return;
    }

    // Step 1: Request accounts list from server
    getAccounts(function (accounts) {
        // Step 2: Validate on client side
        const match = accounts.find(
            (acc) => acc.username === username && acc.password === password
        );

        if (match) {
            // Successful login
            localStorage.setItem("chat_username", username);
            localStorage.setItem("chat_logged_in", "true");

            // Redirect to chat
            window.location.href = "../app/index.html";
        } else {
            showError("Invalid username or password.");
        }
    });
});
