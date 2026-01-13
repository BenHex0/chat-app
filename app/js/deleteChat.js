function deleteChat(username) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/Chat-App/api/deleteChat.php", true);

    let response = null;

    xhr.onload = function () {
        if (xhr.status === 200) {
            response = JSON.parse(xhr.responseText);
        }
    };

    xhr.send(JSON.stringify({ username: username }));
}
