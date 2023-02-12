import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children }) => {
  return <ul className={css.ImageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.element.isRequired,
};
