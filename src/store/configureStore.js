import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../core-modules/reducers';

export default (initialState) => {
    const middlewares = [
        thunk
    ];
    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
    ))
}
