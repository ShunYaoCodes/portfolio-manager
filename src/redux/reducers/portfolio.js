import { SET_PORTFOLIO, UPDATE_POSITION_TYPE, ADD_TO_PORTFOLIO, REMOVE_FROM_PORTFOLIO } from "../actionTypes";

const initialState = {
    positions: [],
    investmentAmount: 0,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_PORTFOLIO: {
            const { positions, investmentAmount } = action.payload;

            return {
                positions,
                investmentAmount,
            }
        }
        case UPDATE_POSITION_TYPE: {
            const { symbolId, positionType } = action.payload;

            const stock = state.positions.find(stock => stock.id === symbolId);
            const index = state.positions.indexOf(stock);

            return {
                ...state,
                positions: [
                    ...state.positions.slice(0, index), 
                    {
                        ...stock,
                        position_type: positionType,
                    },
                    ...state.positions.slice(index + 1),
                ],
            };
        }
        case ADD_TO_PORTFOLIO: {
            const { stock } = action.payload;

            return {
                ...state,
                positions: [
                    ...state.positions,
                    stock,
                ],
            };
        }
        case REMOVE_FROM_PORTFOLIO: {
            const { stock } = action.payload;
            const index = state.positions.indexOf(stock);

            return {
                ...state,
                positions: [
                    ...state.positions.slice(0, index), 
                    ...state.positions.slice(index + 1)
                ],
            };
        }
        default:
            return state;
    }
}