import { CREATE_LOGIN_SESSION, DELETE_LOGIN_SESSION  } from "../actionTypes";

const initialState = {
    token: '',
    id: '',
    firstName: '',
    lastName: '',
}
export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_LOGIN_SESSION: {
            const { token, id, firstName, lastName } = action.payload;
            
            return {
                ...state,
                token,
                id,
                firstName,
                lastName,
            }
        }
        case DELETE_LOGIN_SESSION: {
            return {
                token: '',
                id: '',
                firstName: '',
                lastName: '',
            };
        }
        default:
            return state;
    }
}