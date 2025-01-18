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
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            orderNumber: data.order.number,
            orderName: data.name,
        });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILED });
        console.error('Error creating order:', error);
    }
};

export const showModal = () => ({
    type: SHOW_MODAL,
});

export const hideModal = () => ({
    type: HIDE_MODAL,
});