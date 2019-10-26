import { SET_WATCHLIST } from "../actionTypes";

export default function(state = [], action) {
    switch (action.type) {
        case SET_WATCHLIST: {
            const { watchlist } = action.payload;
            return [
                ...watchlist,
            ];
        }
        default:
            return state;
    }
}