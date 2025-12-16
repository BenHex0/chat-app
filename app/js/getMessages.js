function getMessages(contact, callback) {
    const currentUser = getCurrentUser(); 
    if (!currentUser) {
        callback([]);
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Chat-App/api/getMessages.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data.messages || []);
        } else {
            callback([]);
        }
    };

    xhr.send(JSON.stringify({
        currentUser: currentUser.username,
        contact: contact
    }));
}
