// import { ingredients } from '@utils/ingredients';
import { useState, useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { request } from '../../utils/api';

import styles from './app.module.css';

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await request('/ingredients');
        if (data.success && data.data) {
          const ingredientsWithCount = data.data.map((ingredient) => ({
            ...ingredient,
            __v: 0,
          }));
          setIngredients(ingredientsWithCount);
        } else {
          throw new Error('Неверный формат данных от сервера');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  if (loading) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <div className={`${styles.loading} text text_type_main-medium mt-20`}>
          Загрузка ингредиентов...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <div className={`${styles.error} text text_type_main-medium mt-20`}>
          Ошибка при загрузке ингредиентов: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
};
