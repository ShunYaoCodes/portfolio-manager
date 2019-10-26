import { SET_PORTFOLIO, UPDATE_POSITION_TYPE } from "../actionTypes";

const initialState = {
    portfolio: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_PORTFOLIO: {
            const { portfolio } = action.payload;
            return {
                ...state,
                portfolio,
            };
        }
        case UPDATE_POSITION_TYPE: {
            const { symbolId, positionType } = action.payload;

            const stock = state.portfolio.find(stock => stock.id === symbolId);
            const index = state.portfolio.indexOf(stock);

            return {
                ...state,
                portfolio: [
                    ...state.portfolio.slice(0, index), 
                    {
                        ...stock,
                        position_type: positionType,
                    },
                    ...state.portfolio.slice(index + 1),
                ],
            };
        }
        default:
            return state;
    }
}