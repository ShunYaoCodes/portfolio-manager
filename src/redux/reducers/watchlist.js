import { SET_WATCHLIST, ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST  } from "../actionTypes";

export default function(state = [], action) {
    switch (action.type) {
        case SET_WATCHLIST: {
            const { watchlist } = action.payload;
            
            return [
                ...watchlist,
            ];
        }
        case ADD_TO_WATCHLIST: {
            const { stock } = action.payload;

            return [
                ...state,
                stock,
            ];
        }
        case REMOVE_FROM_WATCHLIST: {
            const { stock } = action.payload;
            const index = state.indexOf(stock);

            return [
              ...state.slice(0, index), 
              ...state.slice(index + 1)
            ];
        }
        default:
            return state;
    }
}