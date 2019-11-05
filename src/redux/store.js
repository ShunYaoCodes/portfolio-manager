import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancer(applyMiddleware(thunk)),
);

store.subscribe(throttle(() => {
    saveState({
        searchHistory: {
            symbols: store.getState().searchHistory.symbols,
        }
    });
}, 1000));

export default store;