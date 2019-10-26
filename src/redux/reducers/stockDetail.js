import AuthAdapter from "../../adapters/AuthAdapter";
import { timeParse } from "d3-time-format";
import { SET_STOCK, SET_STOCK_ERROR } from "../actionTypes";

const initialState = {
    quote: {},
    news: [],
    chart: [],
    inWatchlist: false,
    inPortfolio: false,
    error: '',
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_STOCK: {
            const { stock } = action.payload;
            const { quote, news, chart, inWatchlist, inPortfolio} = stock;

            return {
                ...state,
                quote: quote,
                news: news,
                chart: transformChartData(chart),
                inWatchlist,
                inPortfolio,
                error: '',
            };
        }
        case SET_STOCK_ERROR: {
            const { error } = action.payload;
            return {
                ...state,
                error,
            };
        }
        // this.updateSearchHistory(symbol);
        default:
            return state;
    }
}

function transformChartData(chartData) {
    const parseDate = timeParse("%Y-%m-%d");

    let data = chartData.map(d => {
        return {
        date: parseDate(d.date),
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume,
        }
    })

    data.columns = ['date', 'open', 'high', 'low', 'close', 'volume']

    return data;
}

  
// function getInWatchlistStatus(keyword) {
//     if (AuthAdapter.loggedIn() && this.state.watchlist && !!this.state.watchlist.find(watchlistName => watchlistName.symbol.toLowerCase() === keyword.toLowerCase())) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function getInPortfolioStatus(keyword) {
//     if (AuthAdapter.loggedIn() && this.state.portfolio && !!this.state.portfolio.find(portfolioName => portfolioName.symbol.toLowerCase() === keyword.toLowerCase())) {
//         return true;
//     } else {
//         return false;
//     }
// }
  
// function updateSearchHistory(symbol) {
//     let newSearchHistory = [];

//     if (AppAdapter.searchHistory().length) {
//         newSearchHistory = AppAdapter.searchHistory().filter(stock => stock !== symbol);
//         newSearchHistory.unshift(symbol); // add to the beginning of array
//     } else {
//         newSearchHistory.push(symbol);
//     }

//     localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory)); 

//     fetch(ApiAdapter.getBatchQuotes(newSearchHistory)).then(r => r.json()).then(searchHistoryQuotes => {
//         this.setState({ searchHistoryQuotes })
//     })
// }