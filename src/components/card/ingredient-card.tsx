import styles from './ingredient-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/api';

interface IngredientCardProps {
    ingredient: Ingredient;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {

    return (
        <>
            <img src={ingredient.image} alt={ingredient.name} className={styles.image}/>
            <Counter count={1} size="default" extraClass="m-1" />

            <div className={styles.price}>    
                <p className={styles.priceValue}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div> 

            <p className={styles.name}>{ingredient.name}</p>
        </>
    );
};