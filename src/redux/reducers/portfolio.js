import { GET_PORTFOLIO } from "../actionTypes";

const initialState = {
    portfolio: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PORTFOLIO: {
            const { portfolio } = action.payload;
            return {
                ...state,
                portfolio,
            };
        }
        default:
            return state;
    }
}