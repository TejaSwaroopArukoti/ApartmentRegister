import {createStore, combineReducers} from 'redux';
import {entryReducer} from './reducers/entryReducer';

const rootReducer = combineReducers({
    entry: entryReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;