import { combineReducers } from "redux";
import indexQuotes from "./indexQuotes";
import toggleList from "./toggleList";
import searchHistory from "./searchHistory";
import watchlist from "./watchlist";
import portfolio from "./portfolio";
import stockDetail from "./stockDetail";
import auth from "./auth";

export default combineReducers({ 
    toggleList,
    indexQuotes,
    searchHistory,
    watchlist,
    portfolio,
    stockDetail,
    auth,
});
