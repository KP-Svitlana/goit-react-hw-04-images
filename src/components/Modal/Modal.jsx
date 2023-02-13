import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    data: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };

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
    return (
      <div className={css.Overlay} onClick={this.props.onClose}>
        <div className={css.Modal}>
          <img src={this.props.data} alt={''} />
        </div>
      </div>
    );
  }
}
