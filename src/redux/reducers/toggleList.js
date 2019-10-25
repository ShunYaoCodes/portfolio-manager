import { TOGGLE_LIST } from "../actionTypes";

const initialState = {
  stateName: [], 
  checked: [], 
  symbol: [], 
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LIST: {
      const { stateName, checked, symbol } = action.payload;
      console.log(stateName, checked, symbol);
      return {
        ...state,
        stateName: [
          ...state.stateName,
          stateName,
        ], 
        checked: [
          ...state.checked,
          checked,
        ], 
        symbol: [
          ...state.symbol,
          symbol,
        ], 
      };
    }
    default:
      return state;
  }
}