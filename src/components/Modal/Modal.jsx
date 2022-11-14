import css from './Modal.module.css';

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
