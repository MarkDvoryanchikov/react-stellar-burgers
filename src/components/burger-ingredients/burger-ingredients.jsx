import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useEffect } from 'react';

import { IngredientGroup } from '@components/burger-ingredients/ingredient-group/ingredient-group.jsx';
import { BurgerScrollbar } from '@components/burger-scrollbar/burger-scrollbar.jsx';

import { ingredientsPropType } from '../../utils/prop-types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  console.log(ingredients);

  const [currentTab, setCurrentTab] = useState('bun');
  const scrollBarRef = useRef();

  const groupedIngredients = { bun: [], sauce: [], main: [] };
  for (const ingredient of ingredients) {
    groupedIngredients[ingredient.type].push(ingredient);
  }

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element && scrollBarRef.current) {
      scrollBarRef.current.scrollToElement(element, 'smooth');
    }
  };

  useEffect(() => {
    const container = scrollBarRef.current?.getScrollContainer();
    if (!container) return;

    const handleScroll = () => {
      const sections = ['bun', 'main', 'sauce']
        .map((id) => ({
          id,
          element: document.getElementById(id),
          top: document.getElementById(id)?.getBoundingClientRect().top || 0,
        }))
        .filter((section) => section.element);

      let closestSection = sections[0];
      let minDistance = Math.abs(
        sections[0].element.getBoundingClientRect().top -
          container.getBoundingClientRect().top
      );

      for (let i = 1; i < sections.length; i++) {
        const distance = Math.abs(
          sections[i].element.getBoundingClientRect().top -
            container.getBoundingClientRect().top
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = sections[i];
        }
      }

      if (closestSection && closestSection.id !== currentTab) {
        setCurrentTab(closestSection.id);
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentTab]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={currentTab === 'bun'}
            onClick={() => onTabClick('bun')}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={currentTab === 'main'}
            onClick={() => onTabClick('main')}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={currentTab === 'sauce'}
            onClick={() => onTabClick('sauce')}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <BurgerScrollbar
        ref={scrollBarRef}
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
            id="bun"
          />
          <IngredientGroup
            title="Начинки"
            ingredients={groupedIngredients.main}
            type="main"
            id="main"
          />
          <IngredientGroup
            title="Соусы"
            ingredients={groupedIngredients.sauce}
            type="sauce"
            id="sauce"
          />
        </div>
      </BurgerScrollbar>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType.isRequired,
};
