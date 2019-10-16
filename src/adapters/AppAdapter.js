class AppAdapter {
    static searchHistory() {
        const searchHistory = localStorage.getItem('searchHistory');
        return searchHistory ? searchHistory.split(',') : [];
    }
}

export default AppAdapter