import { UPDATE_SEARCH_HISTORY, SET_SEARCH_HISTORY_QUOTES } from "../actionTypes";

const initialState = {
    symbols: [],
    quotes: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SEARCH_HISTORY: {
            const { symbol } = action.payload;

            const newSearchHistory = state.symbols.filter(stock => stock !== symbol);
            newSearchHistory.unshift(symbol); // add to the beginning of array
            newSearchHistory.splice(10);  // only keep the latest 10 stocks
            
            return {
                ...state,
                symbols: newSearchHistory,
            };
        }
        case SET_SEARCH_HISTORY_QUOTES: {
            const { searchHistoryQuotes } = action.payload;
            return {
                ...state,
                quotes: searchHistoryQuotes,
            };
        }
        default:
            return state;
    }
}