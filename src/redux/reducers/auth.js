import { CREATE_LOGIN_SESSION, REMOVE_LOGIN_SESSION  } from "../actionTypes";

const initialState = {
    token: '',
    id: '',
}
export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_LOGIN_SESSION: {
            const { token, id } = action.payload;
            
            return {
                ...state,
                token,
                id,
            }
        }
        case REMOVE_LOGIN_SESSION: {
            // const { stock } = action.payload;

            // return [
            //     ...state,
            //     stock,
            // ];
        }
        default:
            return state;
    }
}