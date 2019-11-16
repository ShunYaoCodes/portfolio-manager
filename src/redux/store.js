import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const logger = store => next => action => {
    // console.log('dispatching', action);
    // console.log('prev state', store.getState());
    let result = next(action);
    // console.log('next state', store.getState());
    return result;
}

const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err);
        // Raven.captureException(err, {
        //   extra: {
        //     action,
        //     state: store.getState()
        //   }
        // })
        throw err;
    }
}

const persistedState = loadState();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancer(applyMiddleware(thunk, logger, crashReporter)),
);

store.subscribe(throttle(() => {
    saveState({
        searchHistory: {
            symbols: store.getState().searchHistory.symbols,
        },
        auth: store.getState().auth,
    });
}, 1000));

export default store;