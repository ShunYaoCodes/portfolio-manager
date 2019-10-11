const indexes = ['spy', 'qqq', 'dia', 'iwm'];
const publishableKey = 'Tpk_180ac35b572948beb91966b3def6fafb';

class ApiAdapter {
    static host() {
        return 'https://sandbox.iexapis.com/stable/stock';
    }

    static getStockInfo(symbol = '') {
        return `${this.host()}/${symbol}/batch?types=quote,news,chart&range=ytd&token=${publishableKey}`;
    }

    static getIndexQuotes() {
        return this.getBatchQuotes(indexes);
    }

    static getIndexNews() {
        return this.getBatchNews(indexes);
    }

    static getIndexQuotesNews() {
        return this.getBatchQuotesNews(indexes);
    }

    static getBatchQuotes(symbols = []) {
        return `${this.host()}/market/batch?symbols=${symbols.join(',')}&types=quote&token=${publishableKey}`;
    }

    static getBatchNews(symbols = [], newCount = 5) {
        return `${this.host()}/market/batch?symbols=${symbols.join(',')}&types=news&last=${newCount}&token=${publishableKey}`;
    }

    static getBatchQuotesNews(symbols = [], newCount = 5) {
        return `${this.host()}/market/batch?symbols=${symbols.join(',')}&types=quote,news&last=${newCount}&token=${publishableKey}`;
    }

    static getBatchStatsPrice(symbols = [], newCount = 5) {
        return `${this.host()}/market/batch?symbols=${symbols.join(',')}&types=stats,price&last=${newCount}&token=${publishableKey}`;
    }

    static mostActive() {
        return `${this.host()}/market/list/mostactive?token=${publishableKey}`;
    }

    static gainers() {
        return `${this.host()}/market/list/gainers?token=${publishableKey}`;
    }

    static losers() {
        return `${this.host()}/market/list/losers?token=${publishableKey}`;
    }

    static backendHost() {
        return 'http://localhost:3000/api/v1';
    }

    static postSearchHistory() {
        return `${this.backendHost()}/search_histories`;
    }
}

export default ApiAdapter;
 
