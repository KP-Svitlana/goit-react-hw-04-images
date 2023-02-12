import css from './Button.module.css';

export const Button = ({ onBtnClick }) => {
  return (
    <button type="button" className={css.Button} onClick={onBtnClick}>
      Load more
    </button>
  );
};
