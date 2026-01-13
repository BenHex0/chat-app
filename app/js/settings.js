let button = document.getElementById("settings");
const settings = document.querySelector(".settings-panel");
const settingsBackButton = document.querySelector(".back-btn");
const logoutBtn = document.querySelector(".logout-btn");

let showSettings = function () {
    settings.classList.add("active");
};

let backToChatList = function () {
    settings.classList.remove("active");
};

// logout
let logout = function () {
    console.log("Logging out...");

    // stop polling if active
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/Chat-App/api/logout.php", false);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href = "index.php";
        } else {
            console.error("Failed to get current user");
        }
    };
    xhr.send();
};

button.addEventListener("click", showSettings);
settingsBackButton.addEventListener("click", backToChatList);
logoutBtn.addEventListener("click", logout);




// Change profile picture modal elements
const picModal = document.getElementById("profilePicModal");
const choosePicBtn = document.getElementById("choosePicBtn");
const savePicBtn = document.getElementById("savePicBtn");
const cancelPicBtn = document.getElementById("cancelPicBtn");
const picInput = document.getElementById("profilePicInput");
const previewPic = document.getElementById("previewPic");
const changePicBtn = document.querySelector(".change-pic-btn");

let selectedFile = null;

// Open modal
changePicBtn.addEventListener("click", () => {
    picModal.style.display = "flex";

    // Reset preview
    previewPic.style.backgroundImage = "";
    previewPic.textContent = currentUser.username[0];
    selectedFile = null;
});

// Choose image
choosePicBtn.addEventListener("click", () => {
    picInput.click();
});

// Preview image
picInput.addEventListener("change", () => {
    const file = picInput.files[0];
    if (!file) return;

    selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
        previewPic.style.backgroundImage = `url(${reader.result})`;
        previewPic.textContent = "";
    };
    reader.readAsDataURL(file);
});

// Save image
savePicBtn.addEventListener("click", () => {
    if (!selectedFile) {
        alert("Please choose an image");
        return;
    }

    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/Chat-App/api/saveImage.php", true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
    
            if (!res.status) {
                alert(res.message || "Failed to update");
                return;
            }
    
            // Update UI everywhere
            updateProfilePicture(res.url);
    
            picModal.style.display = "none";
        }

    };

    xhr.send(formData);
});

// Cancel
cancelPicBtn.addEventListener("click", () => {
    picModal.style.display = "none";
});
