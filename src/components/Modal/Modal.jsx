import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ data, onClose }) => {
  useEffect(() => {
    const onEcsPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onEcsPress);
    return () => {
      window.addEventListener('keydown', onEcsPress);
    };
  }, [onClose]);

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
