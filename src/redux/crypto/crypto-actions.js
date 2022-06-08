import axios from 'axios';
import {baseUrl} from '../../api/baseUrl'
import { FreeListingTypes } from './crypto-type';


export const getCryptoList = () => async (dispatch) => {
    
    const response = await axios.get(baseUrl);
    
    if (response.data.status == "fail") {
         dispatch({
             type: FreeListingTypes.FREE_LISTING,
             payload: null
         })
     }
     else {
         dispatch({
             type: FreeListingTypes.FREE_LISTING,
             payload: response
         })
         
     }
}

export const setIdData = (id) => ({
    type: FreeListingTypes.SET_ID,
    payload: id
});