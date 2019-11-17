const indexes = ['spy', 'qqq', 'dia', 'iwm', 'vxx'];
const publishableKey = process.env.REACT_APP_PUBLISHABLE_KEY;
const host = process.env.REACT_APP_STOCK_API_HOST;

class ApiAdapter {
    static getStockDetail(symbol = '') {
        return `${host}/${symbol}/batch?types=quote,news,chart&range=ytd&token=${publishableKey}`;
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
        return `${host}/market/batch?symbols=${symbols.join(',')}&types=quote&token=${publishableKey}`;
    }

    static getBatchNews(symbols = [], newCount = 5) {
        return `${host}/market/batch?symbols=${symbols.join(',')}&types=news&last=${newCount}&token=${publishableKey}`;
    }

    static getBatchQuotesNews(symbols = [], newCount = 5) {
        return `${host}/market/batch?symbols=${symbols.join(',')}&types=quote,news&last=${newCount}&token=${publishableKey}`;
    }

    static getBatchStatsPrice(symbols = [], newCount = 5) {
        return `${host}/market/batch?symbols=${symbols.join(',')}&types=stats,price&last=${newCount}&token=${publishableKey}`;
    }

    static mostActive() {
        return `${host}/market/list/mostactive?token=${publishableKey}`;
    }

    static gainers() {
        return `${host}/market/list/gainers?token=${publishableKey}`;
    }

    static losers() {
        return `${host}/market/list/losers?token=${publishableKey}`;
    }
}

export default ApiAdapter;
 
