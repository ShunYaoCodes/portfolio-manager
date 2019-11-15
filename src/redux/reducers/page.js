import { SET_LOCATION_PATH } from "../actionTypes";

const initialState = {
    path: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_LOCATION_PATH: {
            console.log(action.payload);
            const { path } = action.payload;
            console.log(path);
            return {
                ...state,
                path,
            };
        }
        default:
            return state;
    }
}