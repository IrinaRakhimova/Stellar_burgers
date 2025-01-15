import React from "react";
import styles from './ingredient-details.module.css';
import Modal from "../modal/modal";

interface IngredientDetailsProps {
    onClose: () => void;
    ingredient: {
      name: string;
      image_large: string;
      proteins: number;
      fat: number;
      carbohydrates: number;
      calories: number;
    };
}
  
const IngredientDetails: React.FC<IngredientDetailsProps> = ({  onClose, ingredient }) => {
  return (
    <Modal onClose={onClose} header="Детали ингредиента">
        <div className={styles.container}>
            <div className={styles.info}>
                <img src={ingredient.image_large} alt={ingredient.name} className={styles.image}/>
                <p className={styles.name}>{ingredient.name}</p>
                <div className={styles.nutrition}>
                    <div className={styles.textContainer}>
                        <p className={styles.nutrient}>Калории,ккал</p>
                        <p className={styles.nutrientValue}>{ingredient.calories}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.nutrient}>Белки, г</p>
                        <p className={styles.nutrientValue}>{ingredient.proteins}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.nutrient}>Жиры, г</p>
                        <p className={styles.nutrientValue}>{ingredient.fat}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.nutrient}>Углеводы, г</p>
                        <p className={styles.nutrientValue}>{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>    
        </div>
    </Modal>
  );
};

export default IngredientDetails;