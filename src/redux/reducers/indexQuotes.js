import { SET_INDEX } from "../actionTypes";

const initialState = {
    indexQuotes: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_INDEX: {
            const { indexQuotes } = action.payload;
            return {
                ...state,
                indexQuotes,
            };
        }
        default:
            return state;
    }
}