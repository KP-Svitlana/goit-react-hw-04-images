import css from './ImageGalleryItem.module.css';

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
                return onClick(el.id);
              }}
            />
          </li>
        );
      })}
    </>
  );
};
