import { SET_SELECTED_INGREDIENT } from "../actions/modalIngredient";

const initialState = {
    selectedIngredient: null,
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredient: action.ingredient || null,    
            };     
        default:
            return state; 
    }
};