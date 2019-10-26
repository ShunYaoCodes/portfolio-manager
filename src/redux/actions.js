import ApiAdapter from "../adapters/ApiAdapter";
import AppAdapter from "../adapters/AppAdapter";
import { map } from 'lodash';
import { 
  TOGGLE_LIST, 
  GET_WATCHLIST, 
  GET_PORTFOLIO,
  UPDATE_POSITION_TYPE,
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

export const getWatchlist = watchlist => ({
  type: GET_WATCHLIST,
  payload: {
    watchlist,
  }
});

export const getPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  payload: {
    portfolio,
  }
});

export const updatePositionType = (symbolId, positionType) => ({
  type: UPDATE_POSITION_TYPE,
  payload: {
    symbolId,
    positionType,
  }
});
