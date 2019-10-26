import { SET_SEARCH_HISTORY } from "../actionTypes";

const initialState = {
    searchHistoryQuotes: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_HISTORY: {
            const { searchHistoryQuotes } = action.payload;
            return {
                ...state,
                searchHistoryQuotes,
            };
        }
        default:
            return state;
    }
}