import React from "react";
import PropTypes from "prop-types"; 
import styles from './ingredient-details.module.css';
import Modal from "../modal/modal";
import { SET_SELECTED_INGREDIENT } from "../../../services/actions/modalIngredient";
import { useDispatch, useSelector } from "react-redux";


const IngredientDetails = () => {
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch({ type: SET_SELECTED_INGREDIENT, ingredient: null });
    };

    const { selectedIngredient } = useSelector(state => state.modal);

  return (
    <Modal onClose={closeModal} header="Детали ингредиента">
        <div className={styles.container}>
            <div className={styles.info}>
                <img src={selectedIngredient.image_large} alt={selectedIngredient.name} className={styles.image} />
                <p className={styles.name}>{selectedIngredient.name}</p>
                <div className={styles.nutrition}>
                    <div className={styles.textContainer}>
                        <p className={styles.nutrient}>Калории, ккал</p>
                        <p className={styles.nutrientValue}>{selectedIngredient.calories}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.nutrient}>Белки, г</p>
                        <p className={styles.nutrientValue}>{selectedIngredient.proteins}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.nutrient}>Жиры, г</p>
                        <p className={styles.nutrientValue}>{selectedIngredient.fat}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.nutrient}>Углеводы, г</p>
                        <p className={styles.nutrientValue}>{selectedIngredient.carbohydrates}</p>
                    </div>
                </div>
            </div>    
        </div>
    </Modal>
  );
};

IngredientDetails.propTypes = {
    selectedIngredient: PropTypes.shape({
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
    }),
};

export default IngredientDetails;