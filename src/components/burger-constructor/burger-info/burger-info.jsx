import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-info.module.css';

export const BurgerInfo = ({ price }) => {
  return (
    <section className={`${styles.order_content} mr-4`}>
      <div className={`${styles.price} ml-5 pr-10`}>
        <p className={`${styles.price_text} text text_type_digits-medium`}>{price}</p>
        <CurrencyIcon
          type="primary"
          className={`${styles.currency_icon} text text_type_digits-medium ml-6`}
        ></CurrencyIcon>
      </div>
      <Button htmlType="button" type="primary" size="medium">
        Оформить заказ
      </Button>
    </section>
  );
};
