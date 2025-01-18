import {
    DELETE_INGREDIENT,
    ADD_INGREDIENT,

    REORDER_INGREDIENTS,

    RESET_INGREDIENTS
} from '../actions/burgerConstructor';

const initialState = {
    bun: null, // Initially no bun
    ingredients: [], // Ensure this is an empty array by default
  };

  export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_INGREDIENT:
        if (!action.ingredient || !action.ingredient.price) {
          return state;
        }
        if (action.ingredient.type === 'bun') {
          return {
            ...state,
            bun: action.ingredient, // Set the bun ingredient
          };
        }
        return {
          ...state,
          ingredients: [...state.ingredients, action.ingredient], // Add other ingredients
        };
  
      case DELETE_INGREDIENT:
        if (state.bun?.instanceId === action.id) {
          return {
            ...state,
            bun: null, // Remove the bun when deleted
          };
        }
        return {
          ...state,
          ingredients: state.ingredients.filter(
            (ingredient) => ingredient.instanceId !== action.id
          ),
        };
  
      case REORDER_INGREDIENTS:
        const { fromIndex, toIndex } = action;
        const updatedIngredients = [...state.ingredients];
        updatedIngredients.splice(toIndex, 0, updatedIngredients.splice(fromIndex, 1)[0]);
        return {
          ...state,
          ingredients: updatedIngredients,
        };
  
      case RESET_INGREDIENTS: 
        return initialState;  
      default:
        return state;
    }
  };