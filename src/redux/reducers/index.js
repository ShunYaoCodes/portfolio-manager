import { combineReducers } from "redux";
import indexQuotes from "./indexQuotes";
import toggleList from "./toggleList";
import searchHistoryQuotes from "./searchHistoryQuotes";
import watchlist from "./watchlist";
import portfolio from "./portfolio";

export default combineReducers({ 
    toggleList,
    indexQuotes,
    searchHistoryQuotes,
    watchlist,
    portfolio,
});
