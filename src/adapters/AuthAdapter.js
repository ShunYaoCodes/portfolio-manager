class AuthAdapter {
    static loggedIn() {
        return !!localStorage.getItem("token")
    }

    static notLoggedIn() {
        return !localStorage.getItem("token")
    }

    static headers() {
        return {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        };
    }
}

export default AuthAdapter