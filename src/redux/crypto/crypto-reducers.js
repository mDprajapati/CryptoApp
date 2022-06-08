import { FreeListingTypes } from "./crypto-type";

const INITIAL_STATE = {
    cryptoData: [],
    id:"",
}

const cryptoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FreeListingTypes.FREE_LISTING:
            return {
                ...state,
                cryptoData: action.payload,
            }
        case FreeListingTypes.SET_ID:
            return {
                ...state,
                id: action.payload,
            }

        default:
            return state;
    }
}

export default cryptoReducer;