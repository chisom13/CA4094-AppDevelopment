function logout() {
    // User is logged out and token is cleared 
    window.localStorage.clear();
    window.location.href = "/";

}