import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const API_KEY = '33564179-6b2e988bcacb2b304e2ebfd76';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export class App extends Component {
  state = {
    value: '',
    images: [],
    page: 1,
    isVisibleBtn: false,
    isLoading: false,
    isModalOpen: false,
    largeImageURL: '',
    isImagesEmpty: false,
    error: '',
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const response = await axios.get(
          `?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const newImages = response.data.hits;
        if (!newImages.length) {
          this.setState({ isImagesEmpty: true });
          return;
        }
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...newImages],
            isVisibleBtn: page < Math.ceil(response.data.totalHits / 12),
          };
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onFormSubmit = value => {
    this.setState({
      value,
      images: [],
      page: 1,
      isVisibleBtn: false,
      isModalOpen: false,
      isImagesEmpty: false,
    });
  };

  onBtnLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  modalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  onImageClick = largeImageURL => {
    this.setState({ isModalOpen: true, largeImageURL: largeImageURL });
  };

  render() {
    const {
      images,
      isVisibleBtn,
      isLoading,
      isModalOpen,
      largeImageURL,
      isImagesEmpty,
      error,
    } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery>
          <ImageGalleryItem data={images} onClick={this.onImageClick} />
        </ImageGallery>
        {isVisibleBtn && <Button onBtnClick={this.onBtnLoadMoreClick} />}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal data={largeImageURL} onClose={this.modalClose} />
        )}
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
  }
}
