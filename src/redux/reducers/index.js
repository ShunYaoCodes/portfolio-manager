import { combineReducers } from "redux";
import indexQuotes from "./indexQuotes";
import toggleList from "./toggleList";
import searchHistoryQuotes from "./searchHistoryQuotes";
import watchlist from "./watchlist";

export default combineReducers({ 
    toggleList,
    indexQuotes,
    searchHistoryQuotes,
    watchlist,
});
