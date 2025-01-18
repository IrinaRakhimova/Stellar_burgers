import { v4 as uuidv4 } from 'uuid';

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';

export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    ingredient: {
        ...ingredient,
        instanceId: uuidv4(), 
        price: ingredient.price || 0,
    },
});

export const resetIngredients = () => ({
    type: RESET_INGREDIENTS,
  });