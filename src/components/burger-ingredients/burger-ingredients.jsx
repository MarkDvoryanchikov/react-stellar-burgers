import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useEffect } from 'react';

import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details.jsx';
import { IngredientGroup } from '@components/burger-ingredients/ingredient-group/ingredient-group.jsx';
import { BurgerScrollbar } from '@components/burger-scrollbar/burger-scrollbar.jsx';

import { useModal } from '../../hooks/use-modal';
import { ingredientsPropType } from '../../utils/prop-types';
import { Modal } from '../modal/modal.jsx';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  console.log(ingredients);

  const [currentTab, setCurrentTab] = useState('bun');
  const scrollBarRef = useRef();
  const [ingredientInModal, setIngredientInModal] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const groupedIngredients = { bun: [], sauce: [], main: [] };
  for (const ingredient of ingredients) {
    groupedIngredients[ingredient.type].push(ingredient);
  }

  const handleIngredientClick = (ingredient) => {
    setIngredientInModal(ingredient);
    openModal(true);
  };

  const closeIngredientModal = () => {
    closeModal(false);
    setIngredientInModal(null);
  };

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
    <>
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
              onIngredientClick={handleIngredientClick}
            />
            <IngredientGroup
              title="Начинки"
              ingredients={groupedIngredients.main}
              type="main"
              id="main"
              onIngredientClick={handleIngredientClick}
            />
            <IngredientGroup
              title="Соусы"
              ingredients={groupedIngredients.sauce}
              type="sauce"
              id="sauce"
              onIngredientClick={handleIngredientClick}
            />
          </div>
        </BurgerScrollbar>
      </section>
      {isModalOpen && ingredientInModal && (
        <Modal onClose={closeIngredientModal} title="Детали ингредиента">
          <IngredientDetails ingredientData={ingredientInModal} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType.isRequired,
};
