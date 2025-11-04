import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredientData }) => {
  if (!ingredientData) return null;

  return (
    <div className={styles.ingredient_details}>
      <img
        src={ingredientData.image_large}
        alt={ingredientData.name}
        className={styles.image}
      />
      <h3 className={`${styles.name} text text_type_main-medium mt-4`}>
        {ingredientData.name}
      </h3>
      <div className={`${styles.nutrition} mt-8 mb-15`}>
        <div className={styles.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredientData.calories}
          </span>
        </div>
        <div className={styles.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredientData.proteins}
          </span>
        </div>
        <div className={styles.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredientData.fat}
          </span>
        </div>
        <div className={styles.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredientData.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredientData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }),
};
