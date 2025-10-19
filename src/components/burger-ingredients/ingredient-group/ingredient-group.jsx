import { IngredientItem } from '../ingredient-item/ingredient-item';

import styles from './ingredient-group.module.css';

export const IngredientGroup = ({ title, ingredients, type }) => {
  return (
    <section className={`ingredient-group ingredient-group-${type}`}>
      <h2
        className={`ingredient-group-header ingredient-group-header-${type} mb-6 mt-10`}
      >
        {title}
      </h2>

      <div
        className={`${styles.ingredient_group_content} ingredient-group-content-${type} ml-4 mr-4`}
      >
        {ingredients.map((ingredient) => (
          <IngredientItem key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
    </section>
  );
};
