import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducers'

const rootReducer = combineReducers({
    user: userReducer,
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store