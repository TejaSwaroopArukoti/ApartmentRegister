import {createStore, combineReducers, applyMiddleware} from 'redux';
import {entryReducer} from './reducers/entryReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
const rootReducer = combineReducers({
    entry: entryReducer
});

const configureStore = () => createStore(rootReducer, applyMiddleware( logger,thunk));

export default configureStore;