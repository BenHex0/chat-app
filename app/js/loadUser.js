function getCurrentUser() {
    let user = null;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/Chat-App/api/session.php", false);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            user = JSON.parse(xhr.responseText);
            console.log(user);
        } else {
            console.error("Failed to get current user");
        }
    };
    xhr.send();
    return user;
}

const username = document.getElementById("username");
const currentUser = getCurrentUser();
username.innerHTML = currentUser.username;

const profileLetter = document.getElementById("settings");

const usernameSettings = document.getElementById("username-settings");
usernameSettings.innerHTML = currentUser.username;

const settingsProfileLetter = document.getElementById("prof-picture");

function updateProfilePicture(avatarUrl) {
    // 1️⃣ Update the main settings panel
    const settingsProfile = document.getElementById("prof-picture");
    if (settingsProfile) {
        settingsProfile.style.backgroundImage = `url(${avatarUrl})`;
        settingsProfile.textContent = ""; // remove letter
    }

    // 2️⃣ Update the sidebar profile letter / picture
    const sidebarProfile = document.getElementById("settings");
    if (sidebarProfile) {
        sidebarProfile.style.backgroundImage = `url(${avatarUrl})`;
        sidebarProfile.textContent = ""; // remove first letter
    }

    // 3️⃣ Optionally update other places like chat header
    const chatHeaderProfile = document.querySelector(
        ".chat-header .profile-picture"
    );
    if (chatHeaderProfile) {
        chatHeaderProfile.style.backgroundImage = `url(${avatarUrl})`;
        chatHeaderProfile.textContent = "";
    }

    // 4️⃣ Update currentUser object so future references are consistent
    if (window.currentUser) {
        currentUser.avatar = avatarUrl;
    }
}

if (currentUser.image === null) {
    profileLetter.innerHTML = currentUser.username[0];
    settingsProfileLetter.innerHTML = currentUser.username[0];
} else {
    updateProfilePicture(currentUser.image);
}
