import ApiAdapter from "../adapters/ApiAdapter";
import AppAdapter from "../adapters/AppAdapter";
import AuthAdapter from "../adapters/AuthAdapter";
import { map } from 'lodash';
import { 
  TOGGLE_LIST, 
  UPDATE_POSITION_TYPE,
  UPDATE_SERACH_HISTORY,
} from "./actionTypes";

// let nextTodoId = 0;

export const toggleList = (stateName, checked, symbol) => ({
  type: TOGGLE_LIST,
  payload: {
    stateName, 
    checked, 
    symbol,
  }
});

export function fetchIndex() {
  return (dispatch, getState) => {
    fetch(ApiAdapter.getIndexQuotes()).then(r => r.json()).then(indexes => {
      const indexQuotes = map(indexes, index => index.quote);
      return dispatch({ type: "SET_INDEX", payload: { indexQuotes } })
    })
  };
};

export function fetchSearchHistory() {
  return (dispatch, getState) => {
    if (AppAdapter.searchHistory().length) {
      fetch(ApiAdapter.getBatchQuotes(AppAdapter.searchHistory()))
      .then(r => r.json())
      .then(searchHistoryQuotes => dispatch({ type: "SET_SEARCH_HISTORY", payload: { searchHistoryQuotes } }))
    }
  };
};

export function fetchWatchlist() {
  return (dispatch, getState) => {
    fetch(`${ApiAdapter.backendHost()}/users/${localStorage.getItem("id")}/watchlists`, {
      headers: AuthAdapter.headers(),
    }).then(r => r.json())
    .then(watchlist => dispatch({ type: "SET_WATCHLIST", payload: { watchlist } }))
  };
};

export function fetchPortfolio() {
  return (dispatch, getState) => {
    fetch(`${ApiAdapter.backendHost()}/users/${localStorage.getItem("id")}/portfolio_assets`, {
      headers: AuthAdapter.headers(),
    }).then(r => r.json())
    .then(portfolio => dispatch({ type: "SET_PORTFOLIO", payload: { portfolio } }))
  };
};

export const updatePositionType = (symbolId, positionType) => ({
  type: UPDATE_POSITION_TYPE,
  payload: {
    symbolId,
    positionType,
  }
});

export function fetchStockDetail(symbol) {
  return (dispatch, getState) => {
    fetch(ApiAdapter.getStockDetail(symbol))
    .then(function(response) {
      if (response.ok) return response;
      throw new Error(symbol);
    })
    .then(stock => stock.json())
    .then(stock => {
      const { watchlist, portfolio } = getState();
      const watchlistState = watchlist.watchlist;
      const portfolioState = portfolio.portfolio;

      return dispatch({ 
        type: 'SET_STOCK', 
        payload: {
          stock: {
            ...stock,
            inWatchlist: !!watchlistState.find(stock => stock.symbol === symbol.toUpperCase()),
            inPortfolio: !!portfolioState.find(stock => stock.symbol === symbol.toUpperCase())
          }
        }
      })
    })
    .then(() => {
      updateSearchHistory(symbol);
      return dispatch(fetchSearchHistory());
    })
    .catch((error) => {
      return dispatch({ 
        type: 'SET_STOCK_ERROR', 
        payload: {
          stockError: `No results for ${error.message}. Please enter a valid stock symbol.`,
        }
      })
    });
  };
};

function updateSearchHistory(symbol) {
  let newSearchHistory = [];

  if (AppAdapter.searchHistory().length) {
      newSearchHistory = AppAdapter.searchHistory().filter(stock => stock !== symbol);
      newSearchHistory.unshift(symbol); // add to the beginning of array
  } else {
      newSearchHistory.push(symbol);
  }

  localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory)); 
}