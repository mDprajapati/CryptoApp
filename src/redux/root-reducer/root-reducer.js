import { combineReducers } from 'redux';
import cryptoReducer from '../crypto/crypto-reducers'
const rootReducer = combineReducers({
    cryptoReducer: cryptoReducer,
})

export default rootReducer;