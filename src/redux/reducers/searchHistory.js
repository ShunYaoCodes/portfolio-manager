import { SET_SEARCH_HISTORY_QUOTES } from "../actionTypes";

const initialState = {
    symbols: [],
    quotes: []
};

export default function(state = initialState, action) {
    switch (action.type) {
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