import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.modalShow();
    }
  };
  render() {
    const { largeImageURL, modalShow } = this.props;
    return (
      <div
        className={css.Overlay}
        onClick={e => {
          if (e.target.localName !== 'img') {
            modalShow();
          }
        }}
      >
        <div className={css.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  modalShow: PropTypes.func.isRequired,
};
