import PropTypes from 'prop-types';

import doneImage from '../../../images/done.jpg';

import styles from './order-details.module.css';

export const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={styles.order_details}>
      <h2 className={`${styles.order_number} text text_type_digits-large`}>
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img src={doneImage} alt="Заказ принят" className={styles.done_image} />
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired,
};
