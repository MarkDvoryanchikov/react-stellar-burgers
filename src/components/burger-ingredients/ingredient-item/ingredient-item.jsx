import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../../utils/prop-types';

import styles from './ingredient-item.module.css';

export const IngredientItem = ({ ingredient, onClick }) => {
  return (
    <section key={ingredient._id} className={styles.ingredient_item} onClick={onClick}>
      {ingredient.__v > 0 && (
        <Counter
          count={ingredient.__v}
          size="default"
          extraClass={styles.counter}
        ></Counter>
      )}
      <div className={styles.ingredient_item_content}>
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name}></img>
        <div className={`${styles.ingredient_item_price} mb-1 mt-1`}>
          <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.ingredient_name} pb-6`}>{ingredient.name}</p>
      </div>
    </section>
  );
};

IngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};
