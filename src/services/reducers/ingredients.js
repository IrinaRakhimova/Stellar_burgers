import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_SECTION
} from '../actions/ingredients';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    currentSection: 'bun',
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true,
            };
        case GET_INGREDIENTS_SUCCESS:
            return { 
                ...state, 
                ingredientsFailed: false, 
                ingredients: action.ingredients, 
                ingredientsRequest: false 
            };
        case GET_INGREDIENTS_FAILED:
            return { 
                ...state, 
                ingredientsFailed: true, 
                ingredientsRequest: false 
            };
        case SET_CURRENT_SECTION:
            return {
                ...state,
                currentSection: action.section,    
            };        
        default:
            return state; 
    }
};