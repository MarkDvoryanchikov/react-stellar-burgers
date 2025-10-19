import PropTypes from 'prop-types';

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  __v: PropTypes.number,
});

export const ingredientsPropType = PropTypes.arrayOf(ingredientPropType);
