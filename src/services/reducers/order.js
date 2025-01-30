import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    SHOW_MODAL,
    HIDE_MODAL,
} from '../actions/order';

const initialState = {
    orderNumber: null,
    orderName: '',
    orderRequest: false,
    orderFailed: false,

    isModalVisible: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { 
                ...state, 
                orderRequest: true, 
                orderFailed: false 
            };
        case CREATE_ORDER_SUCCESS:
            return { 
                ...state, 
                orderRequest: false, 
                orderNumber: action.orderNumber,
                orderName: action.orderName,
                isModalVisible: true, 
            };
        case CREATE_ORDER_FAILED:
            return { 
                ...state, 
                orderRequest: false, 
                orderFailed: true 
            };
        case SHOW_MODAL:
            return {
                ...state,
                isModalVisible: true,
            };
        case HIDE_MODAL:
            return {
                ...state,
                isModalVisible: false,
            };
        default:
            return state;
    }
};