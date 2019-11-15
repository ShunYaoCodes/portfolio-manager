import { SET_LOCATION_PATH } from "../actionTypes";

const initialState = {
    path: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_LOCATION_PATH: {
            const { path } = action.payload;
            return {
                ...state,
                path,
            };
        }
        default:
            return state;
    }
}