import { combineReducers } from "redux";
import indexQuotes from "./indexQuotes";
import toggleList from "./toggleList";
import searchHistory from "./searchHistory";
import watchlist from "./watchlist";
import portfolio from "./portfolio";
import stockDetail from "./stockDetail";

export default combineReducers({ 
    toggleList,
    indexQuotes,
    searchHistory,
    watchlist,
    portfolio,
    stockDetail,
});
