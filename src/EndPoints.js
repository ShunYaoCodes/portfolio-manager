export default {
    host: 'https://api.iextrading.com/1.0/stock/market',
    index: 'https://api.iextrading.com/1.0/stock/market/batch?symbols=spy,dia,qqq,iwm,vxx&types=quote',
    mostActive: 'https://api.iextrading.com/1.0/stock/market/list/mostactive',
    gainers: 'https://api.iextrading.com/1.0/stock/market/list/gainers',
    losers: 'https://api.iextrading.com/1.0/stock/market/list/losers',
    backendHost: 'https://portfolio-database.herokuapp.com/api/v1',
};