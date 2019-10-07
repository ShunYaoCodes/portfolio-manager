// const host = 'https://sandbox.iexapis.com/stable/stock';
const index = 'batch?symbols=spy,qqq,dia,iwm&types=quote';
const news = 'batch?symbols=spy,qqq,dia,iwm&types=news&last=5';
const publishableKey = 'Tpk_180ac35b572948beb91966b3def6fafb';
const mostActive = 'list/mostactive';
const gainers = 'list/gainers';
const losers = 'list/losers';

class ApiAdapter {
    static host() {
        return 'https://sandbox.iexapis.com/stable/stock/market';;
    }

    static index() {
        return `${this.host()}/${index}&token=${publishableKey}`;
    }

    static news() {
        return `${this.host()}/${news}&token=${publishableKey}`;
    }

    static mostActive() {
        return `${this.host()}/${mostActive}?token=${publishableKey}`;
    }

    static gainers() {
        return `${this.host()}/${gainers}?token=${publishableKey}`;
    }

    static losers() {
        return `${this.host()}/${losers}?token=${publishableKey}`;
    }

    static backendHost() {
        return 'https://portfolio-database.herokuapp.com/api/v1';
    }
}

export default ApiAdapter;
 
