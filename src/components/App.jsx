import { useState, useEffect } from 'react';
import { RestAPI } from './RestAPI/RestAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isImagesEmpty, setIsImagesEmpty] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (value === '') {
      return;
    } else {
      try {
        setIsLoading(true);
        async function fetchData() {
          const response = await RestAPI(value, page).then(
            result => result.data
          );
          const newImages = await response.hits;
          const totalHits = await response.totalHits;

          if (!newImages.length) {
            setIsImagesEmpty(true);
            return;
          }
          setImages(images => [...images, ...newImages]);
          setIsVisibleBtn(page < Math.ceil(totalHits / 12));
        }
        fetchData();
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [page, value]);

  const onFormSubmit = value => {
    setValue(value);
    setImages([]);
    setPage(1);
    setIsVisibleBtn(false);
    setIsModalOpen(false);
    setIsImagesEmpty(false);
  };

  const onBtnLoadMoreClick = () => {
    setPage(page + 1);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const onImageClick = largeImageURL => {
    setIsModalOpen(true);
    setLargeImageURL(largeImageURL);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery>
        <ImageGalleryItem data={images} onClick={onImageClick} />
      </ImageGallery>
      {isVisibleBtn && <Button onBtnClick={onBtnLoadMoreClick} />}
      {isLoading && <Loader />}
      {isModalOpen && <Modal data={largeImageURL} onClose={modalClose} />}
      {isImagesEmpty && (
        <p style={{ textAlign: 'center' }}>
          Sorry, nothing was found for your query. Please try something else.
        </p>
      )}
      {error && (
        <p style={{ textAlign: 'center' }}>
          Sorry, something going wrong. Please try again.
        </p>
      )}
    </div>
  );
};
