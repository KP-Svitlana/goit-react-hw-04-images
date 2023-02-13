import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ data, onClick }) => {
  return (
    <>
      {data.map(el => {
        return (
          <li key={el.id} className={css.ImageGalleryItem}>
            <img
              className={css.ImageGalleryItemImage}
              src={el.webformatURL}
              alt={el.tags}
              onClick={() => {
                return onClick(el.largeImageURL);
              }}
            />
          </li>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  onClick: PropTypes.func.isRequired,
};
