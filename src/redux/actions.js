import ApiAdapter from "../adapters/ApiAdapter";
import { SET_INDEX, UPDATE_SEARCH_HISTORY, SET_SEARCH_HISTORY_QUOTES, SET_WATCHLIST, SET_PORTFOLIO, 
  SET_STOCK, SET_STOCK_ERROR, SET_STOCK_STATUS, UPDATE_POSITION_TYPE, UPDATE_INVESTMENT_AMOUNT,
  CREATE_LOGIN_SESSION, DELETE_LOGIN_SESSION} from "./actionTypes";

export function fetchIndex() {
  return (dispatch, getState) => {
    fetch(ApiAdapter.getIndexQuotes()).then(r => r.json()).then(indexes => {
      const indexQuotes = Object.values(indexes).map(index => index.quote);
      return dispatch({ type: SET_INDEX, payload: { indexQuotes } })
    })
  };
};

export function fetchSearchHistory() {
  return (dispatch, getState) => {
    if (getState().searchHistory.symbols.length) {
      fetch(ApiAdapter.getBatchQuotes(getState().searchHistory.symbols))
      .then(r => r.json())
      .then(searchHistoryQuotes => dispatch({ type: SET_SEARCH_HISTORY_QUOTES, payload: { searchHistoryQuotes } }))
    }
  };
};

export function fetchWatchlist() {
  return (dispatch, getState) => {
    fetch(`${ApiAdapter.backendHost()}/users/${getState().auth.id}/watchlists`, {
      headers: authHeaders(getState().auth.token),
    })
    .then(checkStatus)
    .then(r => r.json())
    .then(watchlist => dispatch({ type: SET_WATCHLIST, payload: { watchlist } }))
    .catch(error => {
        console.log(error);
        error.response.json().then(detail => {
            if (detail.message === 'Invalid Token or Token Expired') {
              return dispatch({ type: DELETE_LOGIN_SESSION })
            }
        })
    })
  };
};

export function fetchPortfolio() {
  return (dispatch, getState) => {
    fetch(`${ApiAdapter.backendHost()}/users/${getState().auth.id}/portfolio_assets`, {
      headers: authHeaders(getState().auth.token),
    })
    .then(checkStatus)
    .then(r => r.json())
    .then(({ positions, investment_amount }) => dispatch({ 
      type: SET_PORTFOLIO, 
      payload: { 
        positions, 
        investmentAmount: investment_amount 
      } 
    }))
    .catch(error => {
      console.log(error);
      error.response.json().then(detail => {
          if (detail.message === 'Invalid Token or Token Expired') {
            return dispatch({ type: DELETE_LOGIN_SESSION })
          }
      })
    })
  };
};

export function updatePositionType(symbolId, positionType) {
  return (dispatch, getState) => {
    fetch(`${ApiAdapter.backendHost()}/portfolio_assets/${symbolId}`, {
      method: "PATCH",
      headers: authHeaders(getState().auth.token),
      body: JSON.stringify({ position_type: positionType })
    })

    return dispatch({ type: UPDATE_POSITION_TYPE, payload: { symbolId, positionType } });
  };
};

export function updateInvestmentAmount(amount) {
  return (dispatch, getState) => {
    fetch(`${ApiAdapter.backendHost()}/users/${getState().auth.id}`, {
      method: "PATCH",
      headers: authHeaders(getState().auth.token),
      body: JSON.stringify({ investment_amount: amount })
    })

    return dispatch({ type: UPDATE_INVESTMENT_AMOUNT, payload: { investmentAmount: amount } });
  };
};

export function toggleStatus(stateName, checked, symbol) {
  return (dispatch, getState) => {
    let endpoint, statusName;

    switch (stateName) {
      case 'watchlist':
        endpoint = 'watchlists';
        statusName = 'inWatchlist';
        break;
      case 'portfolio':
        endpoint = 'portfolio_assets';
        statusName = 'inPortfolio';
        break;
      default:
        endpoint = stateName + 's';
        statusName = 'in'+ stateName.slice(0,1).toUpperCase() + stateName.slice(1);
    }

    if (checked) {
      fetch(`${ApiAdapter.backendHost()}/users/${getState().auth.id}/${endpoint}`, {
        method: "POST",
        headers: authHeaders(getState().auth.token),
        body: JSON.stringify({ symbol })
      }).then(r => r.json()).then(stock => {
        return dispatch({ type: `ADD_TO_${stateName.toUpperCase()}`, payload: { stock } })
      }).then(() => {
        return dispatch({ type: SET_STOCK_STATUS, payload: { [statusName]: checked } })
      })
    } else {
      const stock = getState()[stateName].find(stock => stock.symbol === symbol);
      fetch(`${ApiAdapter.backendHost()}/${endpoint}/${stock.id}`, {
        method: "DELETE",
        headers: authHeaders(getState().auth.token),
      }).then(r => r.json()).then(() => {
        return dispatch({ type: `REMOVE_FROM_${stateName.toUpperCase()}`, payload: { stock } })
      }).then(() => {
        return dispatch({ type: SET_STOCK_STATUS, payload: { [statusName]: checked } })
      })
    }
  }
};

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

      return dispatch({ 
        type: SET_STOCK, 
        payload: {
          stock: {
            ...stock,
            inWatchlist: !!watchlist.find(stock => stock.symbol === symbol.toUpperCase()),
            inPortfolio: !!portfolio.positions.find(stock => stock.symbol === symbol.toUpperCase())
          }
        }
      })
    })
    .then(() => dispatch({ type: UPDATE_SEARCH_HISTORY, payload: { symbol } }))
    .then(() => dispatch(fetchSearchHistory()))
    .catch((error) => {
      return dispatch({ 
        type: SET_STOCK_ERROR, 
        payload: {
          stockError: `No results for ${error.message}. Please enter a valid stock symbol.`,
        }
      })
    });
  };
};

export function createLoginSession(token, id) {
  return (dispatch, getState) => dispatch({ 
      type: CREATE_LOGIN_SESSION, 
      payload: { 
        token, 
        id,
      } 
  })
};

export function deleteLoginSession() {
  return (dispatch, getState) => dispatch({ type: DELETE_LOGIN_SESSION })
};

function authHeaders(authToken) {
  return {
    "Content-Type": "application/json",
    "Authorization": authToken,
  };
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
      return response;
  } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
  }
}