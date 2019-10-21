import { combineReducers } from "redux";
import indexQuotes from "./indexQuotes";
import toggleList from "./toggleList";

export default combineReducers({ 
    toggleList,
    indexQuotes,
});
