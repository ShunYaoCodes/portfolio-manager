import { 
  TOGGLE_LIST, 
  GET_INDEX, 
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

export const getIndex = indexQuotes => ({
  type: GET_INDEX,
  payload: {
    indexQuotes,
  }
});

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
