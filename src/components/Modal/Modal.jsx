import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ data, onClose }) => {
  const onEcsPress = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onEcsPress);
    return () => {
      document.addEventListener('keydown', onEcsPress);
    };
  });

  return (
    <div className={css.Overlay} onClick={onClose}>
      <div className={css.Modal}>
        <img src={data} alt={''} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  data: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
