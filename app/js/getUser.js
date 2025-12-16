// =============================
// getUser.js
// Retrieves the current logged-in user
// =============================

/**
 * Get the currently logged-in user
 * @returns {Object|null} user object or null if not logged in
 */
function getCurrentUser() {
    const loggedIn = localStorage.getItem("chat_logged_in");
    console.log("logged in: " + loggedIn);
    if (!loggedIn || loggedIn !== "true") {
        return null; // user not logged in
    }

    const username = localStorage.getItem("chat_username");
    console.log("user name: " + username);
    if (!username) {
        return null;
    }
    userInfo = {
        loggedIn: loggedIn,
        username: username
    };
    return userInfo;
}

/**
 * Example usage:
 * const currentUser = getCurrentUser();
 * if (currentUser) {
 *     console.log("Logged in as:", currentUser.username);
 * } else {
 *     console.log("No user logged in");
 * }
 */
