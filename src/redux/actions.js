import ApiAdapter from "../adapters/ApiAdapter";
import { map } from 'lodash';
import { 
  TOGGLE_LIST, 
  GET_SEARCH_HISTORY, 
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
  }
};

export const getSearchHistory = searchHistoryQuotes => ({
  type: GET_SEARCH_HISTORY,
  payload: {
    searchHistoryQuotes,
  }
});

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
