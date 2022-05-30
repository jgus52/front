import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducers'
import electionReducer from './reducers/electionReducers'
import hashlistReducer from './reducers/hashlistReducers'

const rootReducer = combineReducers({
    user: userReducer,
    election: electionReducer,
    hashlist: hashlistReducer,
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store