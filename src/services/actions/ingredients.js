import { fetchIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION';

export function getIngredients() {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      fetchIngredients().then(res => {
        console.log(res); 
      
        if (res && Array.isArray(res)) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res 
          });
        } else {
          dispatch({ type: GET_INGREDIENTS_FAILED });
        }
      })
    };
}