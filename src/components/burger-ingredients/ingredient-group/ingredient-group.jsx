import PropTypes from 'prop-types';

import { ingredientsPropType } from '../../../utils/prop-types';
import { IngredientItem } from '../ingredient-item/ingredient-item';

import styles from './ingredient-group.module.css';

export const IngredientGroup = ({ title, ingredients, type, id, onIngredientClick }) => {
  return (
    <section id={id} className={`ingredient-group ingredient-group-${type}`}>
      <h2
        className={`ingredient-group-header ingredient-group-header-${type} mb-6 mt-10`}
      >
        {title}
      </h2>

      <div
        className={`${styles.ingredient_group_content} ingredient-group-content-${type} ml-4 mr-4`}
      >
        {ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            onClick={() => onIngredientClick(ingredient)}
          />
        ))}
      </div>
    </section>
  );
};

IngredientGroup.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: ingredientsPropType.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  id: PropTypes.string.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};
