import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducers'
import electionReducer from './reducers/electionReducers'

const rootReducer = combineReducers({
    user: userReducer,
    election: electionReducer,
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store