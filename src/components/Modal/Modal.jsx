import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  onEcsPress = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEcsPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEcsPress);
  }

  render() {
    const { largeImageURL, tags } = this.props.data[0];
    return (
      <div className={css.Overlay} onClick={this.props.onClose}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

// export const Modal = ({ data, onClose }) => {
//   const { largeImageURL, tags } = data[0];

//   return (
//     <div className={css.Overlay} onClick={onClose}>
//       <div className={css.Modal}>
//         <img src={largeImageURL} alt={tags} />
//       </div>
//     </div>
//   );
// };
