import { CREATE_LOGIN_SESSION, DELETE_LOGIN_SESSION  } from "../actionTypes";

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
        case DELETE_LOGIN_SESSION: {
            return {
                token: '',
                id: '',
            };
        }
        default:
            return state;
    }
}