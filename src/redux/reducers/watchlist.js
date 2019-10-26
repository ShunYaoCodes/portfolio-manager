import { SET_WATCHLIST } from "../actionTypes";

const initialState = {
    watchlist: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_WATCHLIST: {
            const { watchlist } = action.payload;
            return {
                ...state,
                watchlist,
            };
        }
        default:
            return state;
    }
}