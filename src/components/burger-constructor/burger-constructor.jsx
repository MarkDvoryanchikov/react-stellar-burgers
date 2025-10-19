import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import { BurgerInfo } from '@components/burger-constructor/burger-info/burger-info.jsx';
import { BurgerScrollbar } from '@components/burger-scrollbar/burger-scrollbar.jsx';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  console.log(ingredients);

  const bun =
    ingredients.find((ingredient) => ingredient.type === 'bun') || ingredients[0];
  const mainIngredients = ingredients.filter((ingredient) => ingredient !== bun);

  const totalPrice = ingredients.reduce((sum, ingredient) => {
    return sum + ingredient.price * ingredient.__v;
  }, 0);

  return (
    <section className={`${styles.burger_constructor} ml-4`}>
      <div className={`ml-10 mb-4 mr-4`}>
        <ConstructorElement
          key={`${bun.id}-top`}
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <BurgerScrollbar
        className={styles.scroll_container}
        thumbColor="#8585ad"
        width={8}
        top={0}
        bottom={0}
      >
        <div className={styles.burger_composition}>
          {mainIngredients.map((ingredient) => (
            <div key={ingredient.id} className={styles.ingredient_row}>
              <DragIcon type="primary" className={styles.move_button}></DragIcon>
              <ConstructorElement
                key={ingredient.id}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
      </BurgerScrollbar>
      <div className={`ml-10 mt-4 mr-4`}>
        <ConstructorElement
          key={`${bun.id}-top`}
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={`mt-10`}>
        <BurgerInfo price={totalPrice}></BurgerInfo>
      </div>
    </section>
  );
};
