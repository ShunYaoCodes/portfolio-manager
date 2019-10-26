import { SET_PORTFOLIO, UPDATE_POSITION_TYPE } from "../actionTypes";

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
        default:
            return state;
    }
}