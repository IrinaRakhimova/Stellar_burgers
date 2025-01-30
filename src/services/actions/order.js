import { createOrderRequest } from "../../utils/api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const createOrder = (ingredientIds) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
  
    try {
      const data = await createOrderRequest(ingredientIds);
  
      if (data && data.order && data.order.number && data.name) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          orderNumber: data.order.number, 
          orderName: data.name, 
        });
      } else {
        throw new Error("Invalid response format"); 
      }
    } catch (error) {
      console.error("Error creating order:", error); 
      dispatch({ type: CREATE_ORDER_FAILED }); 
    }
  };

export const showModal = () => ({
    type: SHOW_MODAL,
});

export const hideModal = () => ({
    type: HIDE_MODAL,
});