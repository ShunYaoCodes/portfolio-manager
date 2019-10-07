class AuthAdapter {
    static loggedIn() {
        return !!localStorage.getItem("token")
    }

    static notLoggedIn() {
        return !localStorage.getItem("token")
    }
}

export default AuthAdapter