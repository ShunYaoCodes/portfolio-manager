class AppAdapter {
    static searchHistory() {
        const searchHistory = localStorage.getItem('searchHistory');
        return searchHistory ? JSON.parse(searchHistory) : [];
    }
}

export default AppAdapter