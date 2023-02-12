import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onBtnClick }) => {
  return (
    <button type="button" className={css.Button} onClick={onBtnClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
