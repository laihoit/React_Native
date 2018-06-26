import { createStore, applyMiddleware, compose} from 'redux';
import reducer from './combineReducer';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const enhancer = compose(
    applyMiddleware(thunk, loggerMiddleware),autoRehydrate()
)

const store = createStore(reducer, enhancer);

export const persist = persistStore(store, {
    storage : AsyncStorage,
    blacklist: ['message']
}); 

export default store;