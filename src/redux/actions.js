import { TOGGLE_LIST, GET_INDEX, GET_SEARCH_HISTORY, GET_WATCHLIST } from "./actionTypes";

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


// export const toggleTodo = id => ({
//   type: TOGGLE_TODO,
//   payload: { id }
// });

// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
