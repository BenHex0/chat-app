// =============================
// getContacts.js
// Fetch contacts for the current logged-in user
// =============================

/**
 * Get contacts for the currently logged-in user
 * @param {Function} callback - function(contactsArray) called with contacts
 */
function getUserContacts(callback) {
    const currentUser = getCurrentUser(); // getCurrentUser from getUser.js
    if (!currentUser) {
        console.warn("No logged-in user found.");
        callback([]);
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Chat-App/api/getUserContacts.php", true);
    xhr.setRequestHeader("Content-Type", "application/json"); // Important for PHP

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Response:", xhr.responseText);
            try {
                const data = JSON.parse(xhr.responseText);

                // data is now the contacts object { contact: [...] }
                if (data && Array.isArray(data.contact)) {
                    callback(data.contact);
                } else {
                    callback([]);
                }
            } catch (e) {
                console.error("Failed to parse response JSON:", e);
                callback([]);
            }
        } else {
            console.error("Failed to fetch contacts. Status:", xhr.status);
            callback([]);
        }
    };

    xhr.onerror = function () {
        console.error("Network error while fetching contacts");
        callback([]);
    };

    // Send username as JSON object
    xhr.send(JSON.stringify(currentUser.username));
}

/**
 * Example usage:

getUserContacts(function (contacts) {
    console.log("Contacts for current user:", contacts);

    const container = document.getElementById("contactsContainer");
    if (container) {
        container.innerHTML = contacts.length
            ? contacts.map(name => `<div class="contact">${name}</div>`).join("")
            : "<div>No contacts found</div>";
    }
});

*/
