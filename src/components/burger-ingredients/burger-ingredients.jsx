import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { IngredientGroup } from '@components/burger-ingredients/ingredient-group/ingredient-group.jsx';
import { BurgerScrollbar } from '@components/burger-scrollbar/burger-scrollbar.jsx';

import { ingredientsPropType } from '../../utils/prop-types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  console.log(ingredients);

  const groupedIngredients = { bun: [], sauce: [], main: [] };
  for (const ingredient of ingredients) {
    groupedIngredients[ingredient.type].push(ingredient);
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      <BurgerScrollbar
        className={styles.scroll_container}
        thumbColor="#8585ad"
        width={8}
        top={48}
        bottom={48}
      >
        <div className={styles.ingredients_group}>
          <IngredientGroup
            title="Булки"
            ingredients={groupedIngredients.bun}
            type="bun"
          />
          <IngredientGroup
            title="Соусы"
            ingredients={groupedIngredients.sauce}
            type="sauce"
          />
          <IngredientGroup
            title="Начинки"
            ingredients={groupedIngredients.main}
            type="main"
          />
        </div>
      </BurgerScrollbar>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType.isRequired,
};
