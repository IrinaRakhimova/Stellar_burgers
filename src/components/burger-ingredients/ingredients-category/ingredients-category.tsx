import styles from './ingredients-category.module.css';
import { Ingredient } from '../../../utils/api';
import { IngredientCard } from '../../card/ingredient-card';

interface IngredientsCategoryProps {
    categoryName: string;
    categoryType: string;
    burgerData: Ingredient[];
    setSelectedIngredient: React.Dispatch<React.SetStateAction<Ingredient | null>>;
  }

export const IngredientsCategory: React.FC<IngredientsCategoryProps> = ({ categoryName, categoryType, burgerData, setSelectedIngredient }) => {
   
    const handleIngredientClick = (ingredient: Ingredient) => {
            setSelectedIngredient(ingredient);
        };

    return (
        <>
            <h2 className={styles.bunHeader} id='buns'>{categoryName}</h2>
            <ul className={styles.ingredientType}>
                {burgerData.map((ingredient) => ingredient.type === categoryType && (
                    <li key={ingredient._id} className={styles.ingredient} onClick={() => handleIngredientClick(ingredient)}>
                        <IngredientCard ingredient={ingredient} />
                    </li>
                ))} 
            </ul>
        </>
    );
};