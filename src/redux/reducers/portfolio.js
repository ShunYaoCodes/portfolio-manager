import { SET_PORTFOLIO, UPDATE_POSITION_TYPE, ADD_TO_PORTFOLIO, REMOVE_FROM_PORTFOLIO } from "../actionTypes";

export default function(state = [], action) {
    switch (action.type) {
        case SET_PORTFOLIO: {
            const { portfolio } = action.payload;

            return [
                ...portfolio,
            ];
        }
        case UPDATE_POSITION_TYPE: {
            const { symbolId, positionType } = action.payload;

            const stock = state.find(stock => stock.id === symbolId);
            const index = state.indexOf(stock);

            return [
                ...state.slice(0, index), 
                {
                    ...stock,
                    position_type: positionType,
                },
                ...state.slice(index + 1),
            ];
        }
        case ADD_TO_PORTFOLIO: {
            const { stock } = action.payload;

            return [
                ...state,
                stock,
            ];
        }
        case REMOVE_FROM_PORTFOLIO: {
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