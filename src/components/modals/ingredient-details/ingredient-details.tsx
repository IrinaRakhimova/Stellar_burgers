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
                <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
                <div className={styles.nutrition}>
                    <div className={styles.textContainer}>
                        <p className="text text_type_main-default">Калории,ккал</p>
                        <p className="text text_type_digits-default">{ingredient.calories}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className="text text_type_main-default">Белки, г</p>
                        <p className="text text_type_digits-default">{ingredient.proteins}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className="text text_type_main-default">Жиры, г</p>
                        <p className="text text_type_digits-default">{ingredient.fat}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className="text text_type_main-default">Углеводы, г</p>
                        <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>    
        </div>
    </Modal>
  );
};

export default IngredientDetails;