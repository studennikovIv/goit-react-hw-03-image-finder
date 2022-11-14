import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, modalShow }) => {
  return (
    <div className={css.Overlay} onClick={modalShow}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  modalShow: PropTypes.func.isRequired,
};
