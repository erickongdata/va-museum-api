import PropTypes from 'prop-types';

function ImageModal({ src, srcSet, alt, onClick }) {
  return (
    <div className="image-modal" onClick={onClick} aria-hidden="true">
      <button
        type="button"
        className="image-modal__close"
        data-cy="modal-image-close"
        onClick={onClick}
      >
        &times;
      </button>
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        className="image-modal__image"
        data-component="modal-image"
      />
    </div>
  );
}

ImageModal.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

ImageModal.defaultProps = {
  srcSet: '',
  alt: '',
  onClick: () => {},
};

export default ImageModal;
