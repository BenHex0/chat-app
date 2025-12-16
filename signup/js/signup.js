const form = document.getElementById("signupForm");
const errorMsg = document.getElementById("errorMsg");

function showError(text) {
    errorMsg.textContent = text;
    errorMsg.style.display = "block";
}

function clearError() {
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    clearError();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!username || !password || !confirmPassword) {
        showError("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("this " +  xhr.statusText);
            const res = JSON.parse(xhr.responseText);
            if (res.status) {
                localStorage.setItem("chat_username", username);
                localStorage.setItem("chat_logged_in", "true");
                window.location.href = "../app/index.html";
            } else {
                showError(res.message);
            }
        } else {
            showError("Server error, try again later.");
        }
    };

    xhr.onerror = function() {
        showError("Network error, check your connection.");
    };

    xhr.send(JSON.stringify({ username, password }));
});
