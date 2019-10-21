import { combineReducers } from "redux";
import indexQuotes from "./indexQuotes";
import toggleList from "./toggleList";
import searchHistoryQuotes from "./searchHistoryQuotes";

export default combineReducers({ 
    toggleList,
    indexQuotes,
    searchHistoryQuotes,
});
